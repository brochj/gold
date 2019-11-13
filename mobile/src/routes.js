import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignSwitch from '~/pages/SignSwitch';

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
    inactiveColor: '#bbb',
    shifting: true,
    barStyle: {
      backgroundColor: '#196a65',
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Dashboard') {
          iconName = 'dashboard';
        } else if (routeName === 'RecipeStack') {
          iconName = `book`;
        } else if (routeName === 'DietPlanStack') {
          iconName = `restaurant`;
        } else if (routeName === 'ProfileStack') {
          iconName = `person-pin`;
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
