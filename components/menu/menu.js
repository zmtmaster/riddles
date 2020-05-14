import React, { memo, useRef, useState } from 'react';
import { Animated, View, TouchableWithoutFeedback, Image } from 'react-native';

import styles from './menu.style';

const useAnimatedMenu = (children = [], direction = 'vertical') => {
  const animation = useRef(new Animated.Value(0)).current;
  const [opened, setOpened] = useState(false);
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        }),
      },
    ],
  };
  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const childrenAnimation = children.map((child, index) => ({
    transform: [
      { scale: animation },
      {
        [direction === 'horizontal'
          ? 'translateX'
          : 'translateY']: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            0,
            (index + 1) * 60 * (direction === 'horizontal' ? 1 : -1),
          ],
        }),
      },
    ],
    opacity,
  }));

  const toggle = () => {
    const toValue = opened ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
    }).start();

    setOpened(!opened);
  };

  return { onPress: toggle, rotation, childrenAnimation };
};

const Menu = memo(({ children = [], style, direction }) => {
  const { onPress, rotation, childrenAnimation } = useAnimatedMenu(
    children,
    direction
  );

  return (
    <View style={[styles.container, style]}>
      {children.map((child, index) => (
        <TouchableWithoutFeedback key={index}>
          <Animated.View
            style={[styles.button, styles.secondary, childrenAnimation[index]]}
          >
            {child}
          </Animated.View>
        </TouchableWithoutFeedback>
      ))}
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[styles.menu, rotation]}>
          <Image
            source={require('../../assets/bricks/small.png')}
            style={[styles.trigger]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
});

export default Menu;
