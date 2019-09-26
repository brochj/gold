import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import coxinha from '~/res/images/recipes/coxinha.jpg'

import { Container, Header, Title, CalorieGoal, MealCard, MealHeader, MealTitle, CalorieIcon, Calorie, MealContent } from './styles';

import FoodItem from '~/components/FoodItem';

const meals = [
  { title: 'Café da manhã', calorie: 375 },
  { title: 'Lanche da manhã', calorie: 304 },
  { title: 'Almoço', calorie: 292 },
  { title: 'Lanche da tarde', calorie: 624 },
  { title: 'Jantar', calorie: 339 },
]

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
