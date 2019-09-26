import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
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

import { getMealsRequest } from '~/store/modules/meal/actions'


function MealCardItem({ data }) {
  return (
    <MealCard>
      <MealHeader>
        <MealTitle>{data.title}</MealTitle>
        <View style={{ flexDirection: 'row' }}>
          <CalorieIcon />
          <Calorie>{data.calorie}</Calorie>
        </View>
      </MealHeader>
    </MealCard>

  );
}
export default function DietPlan() {
  const dispatch = useDispatch();
  const dietPlanId = useSelector(state => state.dietPlan.id)
  const meals = useSelector(state => state.meal.meals)

  useEffect(() => {
    if (!meals) {
      dispatch(getMealsRequest(dietPlanId));
    }
  }, [])

  return (
    <Container>
      <Header>
        <Title>Plano de dieta</Title>
        <CalorieGoal>250</CalorieGoal>
      </Header>


      <FlatList
        data={meals}
        renderItem={({ item }) => <MealCardItem data={item} />}
        keyExtractor={item => item.title}
      />



    </Container>
  );
}
