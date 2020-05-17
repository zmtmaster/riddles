import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RESET_LEVEL_COUNTER } from '../actions/actionTypes';
import { NAVIGATION_KEYS } from '../constants/internals';

export default function useBackOverride() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Override back button to go back to main instead of using router's stack
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(NAVIGATION_KEYS.MAIN);
        dispatch({ type: RESET_LEVEL_COUNTER });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [dispatch, navigation])
  );
}
