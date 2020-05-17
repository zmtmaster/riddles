import React, { Suspense, lazy, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import { NAVIGATION_KEYS } from './constants/internals';
import { INITIALIZE } from './actions/actionTypes';

const MainScreen = lazy(() => import('./screens/main'));
const QuizScreen = lazy(() => import('./screens/quiz'));
const Failed = lazy(() => import('./screens/fail'));
const Win = lazy(() => import('./screens/win'));

const Tab = createBottomTabNavigator();

export default function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: INITIALIZE });
  }, [dispatch]);

  return (
    <>
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
    </>
  );
}
