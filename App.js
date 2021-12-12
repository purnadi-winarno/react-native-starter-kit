/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Router from './Routes';
import {KeepAwakeService} from "./src/services"
// import {Provider} from 'react-redux';
// import {store} from './src/store';

const services = [
  KeepAwakeService
]

const App = () => {
  return (
    // <Provider store={store}>
    <>
      <Router />
      {services.map((S, i) => <S key={i} />)}
    </>
    // </Provider>
  );
};

export default App;
