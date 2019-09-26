import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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

import { getDishesRequest } from '~/store/modules/dish/actions';



function DishCardItem({ data }) {
  return (
    <DishCard>
      <DishHeader>
        <DishTitle>{data.title}</DishTitle>
        <View style={{ flexDirection: 'row' }}>
          <CalorieIcon />
          <Calorie>350 </Calorie>
        </View>
      </DishHeader>

    </DishCard>
  );
}

export default function Meal() {
  const dispatch = useDispatch();

  const mealTitle = useSelector(state => state.meal.title);
  const mealId = useSelector(state => state.meal.id);
  const dietPlanId = useSelector(state => state.dietPlan.id);
  const dishes = useSelector(state => state.dish.dishes);

  useEffect(() => {
    dispatch(getDishesRequest(dietPlanId, mealId));
  }, [mealId]); // eslint-disable-line

  return (
    <Container>
      <Header>
        <Title>{mealTitle}</Title>
        <CalorieGoal>250</CalorieGoal>
      </Header>

      <FlatList
        data={dishes}
        renderItem={({ item }) => <DishCardItem data={item} />}
        keyExtractor={item => String(item.id)}
      />

    </Container>
  );
}
