import React from 'react';
import { Box, Tiles } from '@mobily/stacks';
import { Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import BrickOrder from './brick-order';
import ArrowRotation from './arrow-rotation';
import SlidingPuzzle from './slide-puzzle';

export default function getQuestion(questionIndex, onNext, onFail) {
  switch (questionIndex) {
    case 0: {
      return (
        <>
          <Box padding={3} alignX="center">
            <Text>What is 2 + 2 - 2</Text>
          </Box>
          <Box paddingX={10}>
            <Tiles columns={2} space={2}>
              <Button title="0" onPress={onFail} />
              <Button title="2" onPress={onNext} />
              <Button title="4" onPress={onFail} />
              <Button title="6" onPress={onFail} />
            </Tiles>
          </Box>
        </>
      );
    }
    case 1: {
      return (
        <>
          <Box padding={3} alignX="center">
            <Text>Pick the odd one</Text>
          </Box>
          <Box paddingX={10}>
            <Tiles columns={2} space={2}>
              <Button
                icon={
                  <Image
                    source={require('../../assets/bricks/row-1-col-1.png')}
                  />
                }
                onPress={onFail}
              />
              <Button
                icon={
                  <Image
                    source={require('../../assets/bricks/row-1-col-1.png')}
                  />
                }
                onPress={onFail}
              />
              <Button
                icon={
                  <Image
                    source={require('../../assets/bricks/row-1-col-2.png')}
                  />
                }
                onPress={onNext}
              />
              <Button
                icon={
                  <Image
                    source={require('../../assets/bricks/row-1-col-1.png')}
                  />
                }
                onPress={onFail}
              />
            </Tiles>
          </Box>
        </>
      );
    }
    case 2: {
      return (
        <>
          <Box padding={3} alignX="center">
            <Text>How many days are in 72 hours</Text>
          </Box>
          <Box paddingX={10}>
            <Tiles columns={2} space={2}>
              <Button title="2" onPress={onFail} />
              <Button title="3" onPress={onNext} />
              <Button title="4" onPress={onFail} />
              <Button title="5" onPress={onFail} />
            </Tiles>
          </Box>
        </>
      );
    }
    case 3: {
      return <BrickOrder onNext={onNext} onFail={onFail} />;
    }
    case 4: {
      return <ArrowRotation onNext={onNext} onFail={onFail} />;
    }
    case 5: {
      return <BrickOrder reverse onNext={onNext} onFail={onFail} />;
    }
    case 6: {
      return <SlidingPuzzle onNext={onNext} />;
    }
    default:
      break;
  }

  return null;
}

export const QUESTION_NUMBER = 7;
