import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import './config/ReactotronConfig';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { store, persistor } from './store';
import App from '~/App';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: DatePickerAndroid has been merged',
]);

export default function src() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <App />
        </PersistGate>
      </ApplicationProvider>
    </Provider>
  );
}
