import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import RecipeItem from './RecipeItem';

import {
  DishCard,
  DishHeader,
  DishTitle,
  CalorieIcon,
  Calorie,
} from './styles';

export default function DishCardItem({
  data,
  onLongPress,
  onPress,
  onRecipePress,
}) {
  return (
    <DishCard>
      <TouchableOpacity
        onLongPress={() => onLongPress()}
        onPress={() => onPress()}
      >
        <DishHeader>
          <DishTitle>{data.title}</DishTitle>
          <View style={{ flexDirection: 'row' }}>
            {/* <CalorieIcon /> */}
            {/* <Calorie>350 </Calorie> */}
          </View>
        </DishHeader>
      </TouchableOpacity>
      <FlatList
        data={data.recipes}
        renderItem={({ item }) => (
          <RecipeItem item={item} onPress={() => onRecipePress(item.id)} />
        )}
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
