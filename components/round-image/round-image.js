import React, { memo } from 'react';
import { Image } from 'react-native';

import styles from './round-image.style.js';

const RoundImage = ({ src, round, ...props }) => {
  return <Image source={src} style={round && styles.round} {...props} />;
};

export default memo(RoundImage);
