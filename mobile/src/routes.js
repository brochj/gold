import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';

import PhysicalActivity from './pages/InitialConfig/PhysicalActivity';
import UserBasicData from './pages/InitialConfig/UserBasicData';
import Difficulty from './pages/InitialConfig/Difficulty';
import CaloricExpenditure from './pages/InitialConfig/CaloricExpenditure';
import Objective from './pages/InitialConfig/Objective';
import MealsCalories from './pages/InitialConfig/MealsCalories';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator({
          Dashboard,
        }),
        InitialConfig: createStackNavigator(
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
        ),
      },
      {
        initialRouteName: isSigned ? 'InitialConfig' : 'Sign',
      }
    )
  );
