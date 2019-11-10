import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Profile from '~/pages/ProfileStack/Profile';
import Account from '~/pages/ProfileStack/Account';
import DietsPlans from '~/pages/ProfileStack/DietsPlans';

const ProfileStack = createMaterialTopTabNavigator(
  {
    Profile,
    Account,
    DietsPlans,
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: {
      // tabBarColor: "#f32343",
      title: "Perfil",
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Profile') {
          iconName = 'person-pin';
        } else if (routeName === 'Account') {
          iconName = `verified-user`;
        } else if (routeName === 'DietsPlans') {
          iconName = `restaurant`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#ccc',
      upperCaseLabel: false,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: "#fff"
      },
      style: {
        backgroundColor: '#196a65',
      },
    }
  }
);

export default ProfileStack;
