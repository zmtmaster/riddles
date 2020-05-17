import React, { useCallback } from 'react';
import { Box } from '@mobily/stacks';
import { Bar } from 'react-native-progress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { NEXT_LEVEL, RESET_LEVEL_COUNTER } from '../actions/actionTypes';
import { getSelectedCurrentLevelSelector } from '../selectors';
import { NAVIGATION_KEYS } from '../constants/internals';
import useCounter from '../hooks/useCounter';
import Menu from '../components/menu';
import Background from '../components/background';
import Counter from '../components/counter';
import Question, { QUESTION_NUMBER } from '../components/question';

const disabled = { opacity: 0.3 };

const Quiz = () => {
  const {
    params: { initialTime },
  } = useRoute();
  const { string, seconds } = useCounter(initialTime || 0);
  const dispatch = useDispatch();
  const qIdx = useSelector(getSelectedCurrentLevelSelector);
  const navigation = useNavigation();
  const onFail = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.FAIL, { seconds });
  }, [navigation, seconds]);
  const onNext = useCallback(() => {
    dispatch({ type: NEXT_LEVEL });
  }, [dispatch]);
  const onComplete = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.WIN, { string });
    dispatch({ type: RESET_LEVEL_COUNTER });
  }, [navigation, string, dispatch]);

  return (
    <Background>
      <Box flex="4/5" alignX="center" alignY="center">
        <Question
          onComplete={onComplete}
          onFail={onFail}
          onNext={onNext}
          qIdx={qIdx}
        />
      </Box>
      <Box flex="1/5" alignX="evenly" alignY="center" direction="row">
        <Counter time={string} />
        <Bar progress={qIdx / QUESTION_NUMBER} />
        <Box>
          <Menu>
            <Image
              style={[disabled]}
              source={require('../assets/powerup.png')}
            />
            <Image style={[disabled]} source={require('../assets/shop.png')} />
          </Menu>
        </Box>
      </Box>
    </Background>
  );
};

export default Quiz;
