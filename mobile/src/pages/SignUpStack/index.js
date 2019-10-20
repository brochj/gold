import { createStackNavigator } from 'react-navigation-stack';


import UserBasicData from '~/pages/InitialConfig/UserBasicData';
import SignUp from '~/pages/SignUpStack/SignUp';


const SignUpStack = createStackNavigator({
  SignUp,
  UserBasicData,

}, {
  initialRouteName: 'SignUp',
  defaultNavigationOptions: {
  }


});

export default SignUpStack;