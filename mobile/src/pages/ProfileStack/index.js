import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

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
  }
);

export default ProfileStack;
