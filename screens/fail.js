import React, { useCallback } from 'react';
import { Box } from '@mobily/stacks';
import { Icon } from 'react-native-elements';
import { Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Title from '../components/title';
import Image from '../components/round-image';
import Background from '../components/background';
import { NAVIGATION_KEYS } from '../constants/internals';

export default function Failed() {
  const navigation = useNavigation();
  const onStart = useCallback(() => {
    navigation.navigate(NAVIGATION_KEYS.MAIN);
  }, [navigation]);

  return (
    <Background>
      <Box alignX="around" alignY="center" direction="row" flex="1/5">
        <Title />
      </Box>
      <Box alignX="center" alignY="center" flex="2/5">
        <Image style={[styles.image]} src={require('../assets/cleaner.jpg')} />
        <Text style={[styles.failText]}>Failed</Text>
      </Box>
      <Box alignX="evenly" alignY="center" flex="1/5" direction="row">
        <TouchableOpacity onPress={onStart}>
          <Button title="Back" />
        </TouchableOpacity>
      </Box>
      <Box alignX="evenly" alignY="center" flex="1/5" direction="row">
        <Box alignX="center">
          <Icon raised name="cart-plus" type="font-awesome" color="#f50" />
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
