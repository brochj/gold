import React from 'react';
import { View, FlatList } from 'react-native';

import DietPlantItem from './DietPlanItem'
// import { Container } from './styles';

const dietPlans = [
  {
    "difficulty": "medium",
    "id": 202,
    "objective": "gainMuscle",
    "calorie_goal": 2000,
    "calorie_intake": 1600,
    "physical_activity": "light",
    "creator": {
      "id": 2,
      "name": "Edd Prohaska"
    }
  },
  {
    "difficulty": "medium",
    "id": 203,
    "objective": "gainMuscle",
    "calorie_goal": 2000,
    "calorie_intake": 1600,
    "physical_activity": "light",
    "creator": {
      "id": 2,
      "name": "Edd Prohaska"
    }
  }
]
export default function DietsPlans() {
  return (
    <View >
      <FlatList
        data={dietPlans}
        renderItem={({ item, index }) => <DietPlantItem item={item} index={index} />}
      />
    </View>
  );
}
