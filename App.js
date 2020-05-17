import 'react-native-gesture-handler';
import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import createStore from './store';

import { NAVIGATION_KEYS } from './constants/internals';

const MainScreen = lazy(() => import('./screens/main'));
const QuizScreen = lazy(() => import('./screens/quiz'));
const Failed = lazy(() => import('./screens/fail'));
const Win = lazy(() => import('./screens/win'));

const store = createStore();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <Provider store={store}>
        <Suspense fallback={null}>
          <NavigationContainer>
            <Tab.Navigator
              lazy
              screenOptions={{
                unmountOnBlur: true,
                tabBarVisible: false,
              }}
            >
              <Tab.Screen name={NAVIGATION_KEYS.MAIN} component={MainScreen} />
              <Tab.Screen name={NAVIGATION_KEYS.QUIZ} component={QuizScreen} />
              <Tab.Screen name={NAVIGATION_KEYS.FAIL} component={Failed} />
              <Tab.Screen name={NAVIGATION_KEYS.WIN} component={Win} />
            </Tab.Navigator>
          </NavigationContainer>
        </Suspense>
      </Provider>
    </ThemeProvider>
  );
}
