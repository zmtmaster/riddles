import React, { useCallback, useState } from 'react';
import { Box } from '@mobily/stacks';
import { Bar } from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { NAVIGATION_KEYS } from '../constants/internals';

import useCounter from '../hooks/useCounter';
import Menu from '../components/menu';
import Background from '../components/background';
import Counter from '../components/counter';
import Question, { QUESTION_NUMBER } from '../components/question';

const disabled = { opacity: 0.3 };

const Quiz = () => {
  const time = useCounter();
  const navigation = useNavigation();
  const [qIdx, setQidx] = useState(0);
  const onFail = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.FAIL);
  }, [navigation]);
  const onNext = useCallback(() => {
    setQidx((prev) => prev + 1);
  }, []);
  const onComplete = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.WIN, { time });
  }, [navigation, time]);

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
        <Counter time={time} />
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
