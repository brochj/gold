import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

import SignSwitch from '~/pages/SignSwitch'

import Dashboard from '~/pages/Dashboard';

import RecipeStack from '~/pages/RecipeStack';

import DietPlanStack from '~/pages/DietPlanStack';

import InitialConfigStack from '~/pages/InitialConfigStack';
import ProfileStack from '~/pages/ProfileStack';



const MainBottomTab = createMaterialBottomTabNavigator(
  {
    Dashboard,
    RecipeStack,
    DietPlanStack,
    ProfileStack,
  },
  {
    initialRouteName: 'RecipeStack',
    activeColor: '#fff',
    inactiveColor: '#ddd',
    barStyle: {
      backgroundColor: '#196a65',
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Dashboard') {
          iconName = 'person-pin';
        } else if (routeName === 'RecipeStack') {
          iconName = `verified-user`;
        } else if (routeName === 'DietPlanStack') {
          iconName = `restaurant`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
);

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignSwitch,
        MainBottomTab,
        InitialConfigStack,
      },
      {
        initialRouteName: isSigned ? 'MainBottomTab' : 'SignSwitch',
      }
    )
  );


