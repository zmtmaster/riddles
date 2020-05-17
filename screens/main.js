import React, { useCallback, useEffect } from 'react';
import { Box } from '@mobily/stacks';
// import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  getSelectedCurrentCoinsAmountSelector,
  getBestTimeSelector,
} from '../selectors';
import Title from '../components/title';
import Image from '../components/round-image';
import Background from '../components/background';
import Carousel from '../components/carousel';
import { NAVIGATION_KEYS } from '../constants/internals';
import { GET_TIME } from '../actions/actionTypes';

export default function Main() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const coins = useSelector(getSelectedCurrentCoinsAmountSelector);
  const bestTime = useSelector(getBestTimeSelector);
  const onStart = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.QUIZ);
  }, [navigation]);
  useEffect(() => {
    dispatch({ type: GET_TIME });
  }, [dispatch]);

  return (
    <Background>
      <Box
        alignX="around"
        alignY="center"
        direction="row"
        flex="fluid"
        paddingTop="10"
      >
        <Title />
      </Box>
      <Box alignX="center" alignY="center" flex="3/5">
        <Carousel>
          <Box flex="fluid" alignX="center" alignY="center">
            <TouchableOpacity onPress={onStart}>
              <Image round src={require('../assets/teacher.png')} />
            </TouchableOpacity>
            <Text>Race</Text>
            <Text>Best {bestTime}</Text>
          </Box>
          <Box flex="fluid" alignX="center" alignY="center">
            <TouchableOpacity>
              <Image src={require('../assets/coming-soon.jpg')} />
            </TouchableOpacity>
            <Text>Coming soon</Text>
          </Box>
        </Carousel>
      </Box>
      <Box alignX="center" flex="content">
        <Image src={require('../assets/logo-logo.png')} />
      </Box>
      <Box alignX="center" alignY="center" flex="1/5" direction="row">
        <Box alignX="center" alignY="center" direction="row">
          <Image source={require('../assets/coin.png')} />
          <Text>{coins}</Text>
        </Box>
        {/* <Box alignX="center">
          <Icon raised name="star" type="font-awesome" color="#f50" />
        </Box>
        <Box alignX="center">
          <Icon raised name="cog" type="font-awesome" color="#f50" />
        </Box>
        <Box alignX="center">
          <Icon raised name="cart-plus" type="font-awesome" color="#f50" />
        </Box> */}
      </Box>
    </Background>
  );
}
