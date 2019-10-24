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

import InitialConfigStack from '~/pages/InitialConfigStack'

// import PhysicalActivity from '~/pages/InitialConfigStack/PhysicalActivity';
// import Difficulty from '~/pages/InitialConfigStack/Difficulty';
// import CaloricExpenditure from '~/pages/InitialConfigStack/CaloricExpenditure';
// import Objective from '~/pages/InitialConfigStack/Objective';
// import MealsCalories from '~/pages/InitialConfigStack/MealsCalories';

import CalorieIcon from '~/components/Icons/CalorieIcon';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        MainBottomTab: createMaterialBottomTabNavigator(
          {
            Dashboard,
            Recipes,
            ShowRecipe,
            DietPlanStack: createStackNavigator(
              {
                DietPlan,
                Meal,
              },
              {
                navigationOptions: {
                  title: 'Dieta',
                  tabBarColor: '#196a65',
                  tabBaricon: <CalorieIcon />,
                },
              }
            ),
          },
          {
            initialRouteName: 'Recipes',
            activeColor: '#fff',
            inactiveColor: '#ddd',
            // shifting: true,
            barStyle: {
              backgroundColor: '#196a65',
            },
          }
        ),
        InitialConfigStack,
      },
      {
        initialRouteName: isSigned ? 'MainBottomTab' : 'Sign',
      }
    )
  );
