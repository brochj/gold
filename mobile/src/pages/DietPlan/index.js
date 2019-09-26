import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import {
  Container,
  Header,
  Title,
  CalorieGoal,
  MealCard,
  MealHeader,
  MealTitle,
  CalorieIcon,
  Calorie,
  MealContent
} from './styles';

import FoodItem from '~/components/FoodItem';

import { getMealsRequest, changeActiveMeal } from '~/store/modules/meal/actions'


function MealCardItem({ data, onPress }) {
  return (
    <MealCard>
      <TouchableOpacity onPress={() => onPress(data)}>

        <MealHeader >
          <MealTitle>{data.title}</MealTitle>
          <View style={{ flexDirection: 'row' }}>
            <CalorieIcon />
            <Calorie>{data.calorie}</Calorie>
          </View>
        </MealHeader>
      </TouchableOpacity>
    </MealCard>

  );
}
export default function DietPlan({ navigation }) {
  const dispatch = useDispatch();
  const dietPlanId = useSelector(state => state.dietPlan.id)
  const meals = useSelector(state => state.meal.meals)

  useEffect(() => {
    if (!meals) {
      dispatch(getMealsRequest(dietPlanId));
    }
  }, [])

  function handleMeal(meal) {
    dispatch(changeActiveMeal(meal));
    navigation.navigate('Meal');
  }

  return (
    <Container>
      <Header>
        <Title>Plano de dieta</Title>
        <CalorieGoal>250</CalorieGoal>
      </Header>


      <FlatList
        data={meals}
        renderItem={({ item }) => <MealCardItem data={item} onPress={handleMeal} />}
        keyExtractor={item => item.title}
      />



    </Container>
  );
}
