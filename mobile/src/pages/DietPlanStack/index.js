import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import CalorieIcon from '~/components/Icons/CalorieIcon';

import DietPlan from '~/pages/DietPlan';
import Meal from '~/pages/Meal';

const DietPlanStack = createStackNavigator(
  {
    DietPlan,
    Meal,
  },
  {
    navigationOptions: {
      title: 'Sua Dieta',
      tabBarColor: '#196a65',
      tabBaricon: <CalorieIcon />,
    },
  }
);

export default DietPlanStack;
