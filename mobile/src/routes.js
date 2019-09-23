import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';

import ActivityLevel from './pages/InitialConfig/ActivityLevel';
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
        InitialConfig: createStackNavigator({
          UserBasicData,
          ActivityLevel,
          CaloricExpenditure,
          Objective,
          Difficulty,
          MealsCalories,
        }),
      },
      {
        initialRouteName: isSigned ? 'InitialConfig' : 'Sign',
      }
    )
  );
