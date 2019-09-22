# Root import React Native

```js
yarn add babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D
```
- Na pasta raiz, editar/criar os seguintes arquivos.
## babel.config.js

```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-root-import',
      {
        rootPathSuffix: 'src'
      },
    ],
  ],
};
```

## .eslintrc.js

```js
// .eslintrc.js
rules: {
  (...)
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      },
    },
  },
```

## jsconfig.json

```json
// /jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

# Reactotron + Redux

```bash
yarn add reactotron-react-native reactotron-redux reactotron-redux-saga
```

## ReactotronConfig.js
- Em `src/config/ReactotronConfig.js`

```js
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.16.101' })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
```