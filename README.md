# Riddles

Demo [Expo-App](https://expo.io/@zmt/native-expo).

## Features

The site is a game with puzzles. There is an option for a race solving as fast as you can.
Some future features include support for highscores and the ability to skip questions using coins. Also support a shop where you can buy coins.

![alt text](./docs/images/01.png 'Sample 1')

## Stack

In the project project the following technologies have been used.

##### Code

- [Expo](https://expo.io/) (React Native, Expo)
- React Hooks
- [React-Navigation](https://reactnavigation.org/)
  Used with a simple router and parameters
- [Animations](https://reactnative.dev/docs/animations) Used React-Native animations (Animated.View, Animated.Text etc');

##### Device

The application uses a few native capabilities.

- [AsyncStorage](https://docs.expo.io/versions/latest/react-native/asyncstorage/)
- [Sensors](https://docs.expo.io/versions/latest/sdk/sensors/) Used the device motion detector.
- [Redux](https://redux.js.org/) Used to mange some of the application's state;

##### Design (CSS)

The styling of the application mostly uses React Native styling.

- [stylesheet](https://reactnative.dev/docs/stylesheet) React Native StyleSheet
- [styled-components](https://github.com/styled-components/styled-components) Used in some cases (ThemeProvider, styled.View, etc')

##### Other libraries used

- [lodash](https://github.com/lodash/lodash)
- [react-icons](https://github.com/react-icons/react-icons)
