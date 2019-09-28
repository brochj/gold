import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal'
import { useSelector, useDispatch } from 'react-redux';
import { FloatingAction } from "react-native-floating-action";
import coxinha from '~/res/images/recipes/coxinha.jpg';

import {
  Container,
  Header,
  Title,
  CalorieGoal,
  DishCard,
  DishHeader,
  DishTitle,
  CalorieIcon,
  Calorie,
  DishContent,
} from './styles';

import FoodItem from '~/components/FoodItem';

import { getDishesRequest, createDishRequest, deleteDishRequest } from '~/store/modules/dish/actions';



function DishCardItem({ data, onLongPress }) {
  return (
    <DishCard>
      <TouchableOpacity onLongPress={() => onLongPress(data.id)}>
        <DishHeader>
          <DishTitle>{data.title}</DishTitle>
          <View style={{ flexDirection: 'row' }}>
            <CalorieIcon />
            <Calorie>350 </Calorie>
          </View>
        </DishHeader>
      </TouchableOpacity>
      <FlatList
        data={data.recipes}
        renderItem={({ item }) => <Text>recipe: {item.name}</Text>}
        keyExtractor={item => String(item.id)}
        listKey={item => String(item.id)}
      />
      <FlatList
        data={data.foods}
        renderItem={({ item }) => <Text>foods: {item.name}</Text>}
        keyExtractor={item => String(item.id)}
        listKey={item => String(item.id)}
      />

    </DishCard>
  );
}

export default function Meal() {
  const dispatch = useDispatch();

  const mealTitle = useSelector(state => state.meal.title);
  const mealId = useSelector(state => state.meal.id);
  const dietPlanId = useSelector(state => state.dietPlan.id);
  const dishes = useSelector(state => state.dish.dishes);

  const [showModal, setShowModal] = useState(false)
  const [DishTitle, setDishTitle] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    dispatch(getDishesRequest(dietPlanId, mealId));
  }, [mealId, showModal]); // eslint-disable-line

  function handleCreateDish() {
    dispatch(createDishRequest({ title: DishTitle }, dietPlanId, mealId))
  }

  function handleDeleteDish(dishId) {
    dispatch(deleteDishRequest(dietPlanId, mealId, dishId));
    handleRefreshDishes();
  }

  function handleRefreshDishes() {
    setRefreshing(true)
    dispatch(getDishesRequest(dietPlanId, mealId));
    setRefreshing(false)
  }
  return (
    <>
      <Container>
        <Header>
          <Title>{mealTitle}</Title>
          <CalorieGoal>250</CalorieGoal>
        </Header>

        <FlatList
          data={dishes}
          refreshing={refreshing}
          onRefresh={handleRefreshDishes}
          renderItem={({ item }) => <DishCardItem data={item} onLongPress={() => handleDeleteDish(item.id)} />}
          keyExtractor={item => String(item.id)}
        />


      </Container>
      <FloatingAction
        overlayColor='rgba(0,0,0,0.05)'
        showBackground={false}
        onPressMain={() => {
          setShowModal(!showModal)
        }}
        visible={!showModal}
      />

      <Modal isVisible={showModal}
        backdropOpacity={0.5}
        backdropColor="#000"
        showBackground={false}
        onBackdropPress={() => { setShowModal(!showModal) }}
      >
        <>
          <View style={{
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
            <Text>Criar nova opção de refeição</Text>
            <TextInput
              autoFocus
              placeholder="Digite o nome desse prato"
              onChangeText={text => setDishTitle(text)}
              onSubmitEditing={() => {
                setShowModal(!showModal);
                handleCreateDish();
                handleRefreshDishes();
              }}
            />
          </View>
        </>
      </Modal>


    </>
  );
}
