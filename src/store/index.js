import {AsyncStorage} from 'react-native';
import {applyMiddleware, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  blacklist: ['status'],
  storage: AsyncStorage,
  timeout: 0,
};

const middleware = [thunk];

if (__DEV__) {
  middleware.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);
