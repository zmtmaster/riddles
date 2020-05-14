import React from 'react';
import { View, Text } from 'react-native';

import styles from './counter.style';

function Counter({ time = '00:00' }) {
  return (
    <View style={styles.container}>
      <Text>{time}</Text>
    </View>
  );
}

export default Counter;
