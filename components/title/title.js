import React, { memo, useRef, useEffect } from 'react';
import { Animated, Image } from 'react-native';

import styles from './title.style.js';

function Title() {
  const scale = useRef(new Animated.Value(1)).current;
  const borderRadius = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(borderRadius, {
            toValue: 30,
          }),
          Animated.timing(borderRadius, {
            toValue: 0,
          }),
        ]),
      ])
    ).start();
  }, [scale, borderRadius]);

  return (
    <Animated.View
      style={[styles.title, { transform: [{ scale }] }, { borderRadius }]}
    >
      <Image
        resizeMethod="auto"
        style={[styles.icon]}
        source={require('../../assets/icon.png')}
      />
    </Animated.View>
  );
}

export default memo(Title);
