import { createSwitchNavigator } from 'react-navigation'

import SignIn from '~/pages/SignSwitch/SignIn';
import SignUp from '~/pages/SignSwitch/SignUp';

const SignSwitch = createSwitchNavigator(
  {
    SignIn,
    SignUp,
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default SignSwitch;
