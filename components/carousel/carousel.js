import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { times } from 'lodash';

import styles from './carousel.style';

const Carousel = (props) => {
  const { children } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = useState(1);
  const [width, setWidth] = useState(0);

  const init = ($width) => {
    // initialize width
    setWidth($width);
    // initialize total intervals
    const totalItems = children.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const bullets = times(intervals, ($i) => {
    const bulletStyle = [
      styles.bullet,
      { opacity: interval === $i + 1 ? 0.5 : 0.1 },
    ];

    return (
      <Text key={$i} style={bulletStyle}>
        •
      </Text>
    );
  });

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i === intervals) {
        return i;
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            ...styles.scrollView,
            width: `${100 * intervals}%`,
          }}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(w) => init(w)}
          onScroll={(data) => {
            setWidth(data.nativeEvent.contentSize.width);
            setInterval(getInterval(data.nativeEvent.contentOffset.x));
          }}
          scrollEventThrottle={200}
          pagingEnabled
          decelerationRate="fast"
        >
          {children}
        </ScrollView>
        <View style={styles.bullets}>{bullets}</View>
      </View>
    </>
  );
};

export default Carousel;
