import React, { useCallback, useEffect } from 'react';
import { Box } from '@mobily/stacks';
import { Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

import Title from '../components/title';
import Image from '../components/round-image';
import Background from '../components/background';

import { NAVIGATION_KEYS } from '../constants/internals';
import { SET_TIME } from '../actions/actionTypes';
import { getBestTimeSelector } from '../selectors';

export default function Win({
  route: {
    params: { time },
  },
}) {
  const navigation = useNavigation();
  const best = useSelector(getBestTimeSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (time < best) {
      dispatch({
        type: SET_TIME,
        payload: time || '00:00',
      });
    }
  }, [time, best, dispatch]);
  const onStart = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.MAIN);
  }, [navigation]);

  return (
    <Background>
      <Box alignX="around" alignY="center" direction="row" flex="1/5">
        <Title />
      </Box>
      <Box alignX="center" alignY="center" flex="2/5">
        <Text style={[styles.text]}>Well done</Text>
        <Image src={require('../assets/trophy.png')} />
        <Text>Time: {time}</Text>
      </Box>
      <Box alignX="evenly" alignY="center" flex="1/5" direction="row">
        <TouchableOpacity onPress={onStart}>
          <Button title="To Main" />
        </TouchableOpacity>
      </Box>
    </Background>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
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
