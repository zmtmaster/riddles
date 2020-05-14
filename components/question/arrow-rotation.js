import React, { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { Box } from '@mobily/stacks';
import { Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

const text = { fontSize: 20 };

/**
 * Directions, up is 270 degrees,
 *      270
 * 180       360
 *       0
 */

function BrickOrder({ onNext, onFail }) {
  const [north, setNorth] = useState(0);
  function handleUpdate(event) {
    const normalized = (event.rotation.gamma * 360 + 360) % 360;

    setNorth(normalized);
  }

  const onCondition = () => {
    if (north >= 245 && north <= 285) {
      onNext();

      return;
    }

    onFail();
  };

  useEffect(() => {
    const subscription = DeviceMotion.addListener(handleUpdate);

    return () => subscription.remove();
  }, []);

  return (
    <>
      <Box padding={3} alignX="center" direction="row">
        <Text style={[text]}>click on the arrow pointing up</Text>
      </Box>
      <Box paddingX={10} alignX="center" alignY="center">
        <Button
          type="clear"
          icon={
            <Image
              style={{
                transform: [{ rotateZ: `${north}deg` }],
              }}
              source={require('../../assets/bow.png')}
            />
          }
          onPress={onCondition}
        />
      </Box>
    </>
  );
}

export default BrickOrder;
