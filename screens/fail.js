import React, { useCallback } from 'react';
import { Box, Stack } from '@mobily/stacks';
import { Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { RESET_LEVEL_COUNTER, BUY_ITEM } from '../actions/actionTypes';
import Title from '../components/title';
import Image from '../components/round-image';
import Background from '../components/background';
import { NAVIGATION_KEYS, SHOP } from '../constants/internals';
import { getSelectedCurrentCoinsAmountSelector } from '../selectors';

export default function Failed() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: { seconds },
  } = useRoute();
  const coins = useSelector(getSelectedCurrentCoinsAmountSelector);
  const onReset = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.MAIN);
    dispatch({ type: RESET_LEVEL_COUNTER });
  }, [navigation, dispatch]);
  const onTryAgain = useCallback(() => {
    if (coins >= SHOP.TRY_AGAIN) {
      navigation.navigate(NAVIGATION_KEYS.QUIZ, { initialTime: seconds });
      dispatch({ type: BUY_ITEM, payload: { amount: SHOP.TRY_AGAIN } });
    }
  }, [navigation, dispatch, seconds, coins]);

  return (
    <Background>
      <Box alignX="around" alignY="center" direction="row" flex="1/5">
        <Title />
      </Box>
      <Box alignX="center" alignY="center" flex="2/5">
        <Image style={[styles.image]} src={require('../assets/cleaner.jpg')} />
        <Text style={[styles.failText]}>Failed</Text>
      </Box>
      <Box alignX="around" alignY="center" flex="1/5">
        <Stack space={3}>
          <TouchableOpacity onPress={onReset}>
            <Button title="Main" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onTryAgain}>
            <Button
              title={`Try again ${
                coins < SHOP.TRY_AGAIN ? 'not enough coins' : '(5 coins)'
              }`}
              disabled={coins < SHOP.TRY_AGAIN}
            />
          </TouchableOpacity>
        </Stack>
      </Box>
      <Box alignX="evenly" alignY="center" flex="1/5" direction="row">
        <Box alignX="center" alignY="center" direction="row">
          <Image source={require('../assets/coin.png')} />
          <Text>{coins}</Text>
        </Box>
      </Box>
    </Background>
  );
}

const styles = StyleSheet.create({
  image: { width: 320, height: 220 },
  failText: {
    color: '#f00',
    fontSize: 40,
    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
});
