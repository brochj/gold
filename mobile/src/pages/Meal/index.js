import React from 'react';
import { View, FlatList } from 'react-native';
import coxinha from '~/res/images/recipes/coxinha.jpg'

import { Container, Header, Title, CalorieGoal, DishCard, DishHeader, DishTitle, CalorieIcon, Calorie, DishContent } from './styles';

import FoodItem from '~/components/FoodItem';

const foods = [
  { image: coxinha, title: 'Fannie Brewer', amount: 436, unit: 'natural', calorie: 384 },
  { image: coxinha, title: 'Alejandro Wagner', amount: 374, unit: 'depth', calorie: 376 },
  { image: coxinha, title: 'Dorothy Schneider', amount: 72, unit: 'house', calorie: 475 },
  { image: coxinha, title: 'Jeremy Fleming', amount: 364, unit: 'possibly', calorie: 410 },
]
export default function DietPlan() {
  return (
    <Container>
      <Header>
        <Title>Cafe da manha</Title>
        <CalorieGoal>250</CalorieGoal>
      </Header>

      <DishCard>
        <DishHeader>
          <DishTitle> Low carb</DishTitle>
          <View style={{ flexDirection: 'row' }}>

            <CalorieIcon />
            <Calorie>350 </Calorie>
          </View>
        </DishHeader>
        <FlatList
          data={foods}
          renderItem={({ item }) => <FoodItem data={item} />}
          keyExtractor={item => item.title}
        />
      </DishCard>

      <DishCard>
        <DishHeader>
          <DishTitle> Low carb</DishTitle>
          <View style={{ flexDirection: 'row' }}>
            <CalorieIcon />
            <Calorie>350 </Calorie>
          </View>
        </DishHeader>
        <FlatList
          data={foods}
          renderItem={({ item }) => <FoodItem data={item} />}
          keyExtractor={item => item.title}
        />
      </DishCard>

      <DishCard>
        <DishHeader>
          <DishTitle> Low carb</DishTitle>
          <View style={{ flexDirection: 'row' }}>

            <CalorieIcon />
            <Calorie>350 </Calorie>
          </View>
        </DishHeader>
        <DishContent>

          <FlatList
            data={foods}
            renderItem={({ item }) => <FoodItem data={item} />}
            keyExtractor={item => item.title}
          />
        </DishContent>
      </DishCard>

    </Container>
  );
}
