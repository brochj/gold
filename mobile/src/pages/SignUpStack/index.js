import { createStackNavigator } from 'react-navigation-stack';


import UserBasicData from '~/pages/InitialConfig/UserBasicData';
import Name from '~/pages/SignUpStack/Name';


const SignUpStack = createStackNavigator({
  Name,
  UserBasicData,

}, {
  initialRouteName: 'Name',
  defaultNavigationOptions: {
  }


});

export default SignUpStack;