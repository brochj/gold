import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import DietPlan from '~/pages/DietPlan';
import Meal from '~/pages/Meal';
import Recipes from '~/pages/Recipes';
import ShowRecipe from '~/pages/ShowRecipe';

import PhysicalActivity from '~/pages/InitialConfig/PhysicalActivity';
import UserBasicData from '~/pages/InitialConfig/UserBasicData';
import Difficulty from '~/pages/InitialConfig/Difficulty';
import CaloricExpenditure from '~/pages/InitialConfig/CaloricExpenditure';
import Objective from '~/pages/InitialConfig/Objective';
import MealsCalories from './pages/InitialConfig/MealsCalories';


const SignUpStack = createStackNavigator(
  {
    UserBasicData,
    PhysicalActivity,
    CaloricExpenditure,
    Objective,
    Difficulty,
    MealsCalories,
  },
  {
    initialRouteName: 'UserBasicData',
  }
);

export default SignUpStack