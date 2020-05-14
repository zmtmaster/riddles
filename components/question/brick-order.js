import React, { useState, useCallback } from 'react';
import { Box, Tiles } from '@mobily/stacks';
import { Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

const text = { fontSize: 20 };
const highlight = { color: '#1fc600' };
const image = { flex: 1, width: 80, height: 80 };

function BrickOrder({ onNext, onFail, reverse }) {
  const [pressed, setPressed] = useState(false);
  const onCondition = useCallback(() => {
    if (pressed) {
      onNext();

      return;
    }

    onFail();
  }, [onFail, onNext, pressed]);

  return (
    <>
      <Box padding={3} alignX="center" direction="row">
        <Text style={[text]}>Click the</Text>
        <Text style={[text, highlight]}> red </Text>
        <Text style={[text]}>
          bricks from {reverse ? 'small to big' : 'big to small'}
        </Text>
      </Box>
      <Box paddingX={10}>
        <Tiles columns={2} space={2}>
          <Button
            type="outline"
            icon={
              <Image
                style={image}
                source={require('../../assets/bricks/blue-2-1.jpg')}
              />
            }
            onPress={onFail}
          />
          <Button
            type="outline"
            icon={
              <Image
                style={image}
                source={require('../../assets/bricks/green-2-4.jpg')}
              />
            }
            onPress={onFail}
          />
          <Button
            type="outline"
            icon={
              <Image
                style={image}
                source={require('../../assets/bricks/orange-2-2.jpg')}
              />
            }
            onPress={onFail}
          />
          <Button
            type="outline"
            icon={
              <Image
                style={image}
                source={require('../../assets/bricks/red-2-4.jpg')}
              />
            }
            onPress={reverse ? onCondition : setPressed.bind(null, true)}
          />
          <Button
            type="outline"
            icon={
              <Image
                style={image}
                source={require('../../assets/bricks/red-2-2.jpg')}
              />
            }
            onPress={reverse ? setPressed.bind(null, true) : onCondition}
          />
        </Tiles>
      </Box>
    </>
  );
}

export default BrickOrder;
