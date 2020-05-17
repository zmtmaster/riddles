import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import createStore from './store';
import Routes from './Routes';

const store = createStore();

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ThemeProvider>
  );
}
