import React, { useMemo, useState } from 'react';
import {
  range as $range,
  clone as $clone,
  shuffle as $shuffle,
  without as $without,
} from 'lodash';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  holeStyle: { opacity: 0 },
  tile: { backgroundColor: 'red' },
});

// Checks if the puzzle can be solved.
//
// Examples:
//   isSolvable([3, 7, 6, 0, 5, 1, 2, 4, 8], 3, 3) // => false
//   isSolvable([6, 4, 5, 0, 1, 2, 3, 7, 8], 3, 3) // => true
function isSolvable(numbers, rows, cols) {
  let product = 1;
  for (let i = 1, l = rows * cols - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (numbers[i - 1] - numbers[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

// Checks if the puzzle is solved.
//
// Examples:
//   isSolved([6, 4, 5, 0, 1, 2, 3, 7, 8]) // => false
//   isSolved([0, 1, 2, 3, 4, 5, 6, 7, 8]) // => true
function isSolved(numbers) {
  for (let i = 0, l = numbers.length; i < l; i++) {
    if (numbers[i] !== i) {
      return false;
    }
  }
  return true;
}

// Get the row/col pair from a linear index.
function getMatrixPosition(index, rows, cols) {
  return {
    row: Math.floor(index / cols),
    col: index % cols,
  };
}

// function getVisualPosition({ row, col }, width, height) {
//   return {
//     x: col * width,
//     y: row * height,
//   };
// }

function shuffle(numbers, hole, rows, cols) {
  do {
    numbers = $shuffle($without(numbers, hole)).concat(hole);
  } while (isSolved(numbers) || !isSolvable(numbers, rows, cols));
  return numbers;
}

function canSwap(src, dest, rows, cols) {
  const { row: srcRow, col: srcCol } = getMatrixPosition(src, rows, cols);
  const { row: destRow, col: destCol } = getMatrixPosition(dest, rows, cols);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

function swap(numbers, src, dest) {
  numbers = $clone(numbers);
  [numbers[src], numbers[dest]] = [numbers[dest], numbers[src]];
  return numbers;
}

const assets = {
  0: require('../../assets/chunks/row-1-col-1.jpg'),
  1: require('../../assets/chunks/row-1-col-2.jpg'),
  2: require('../../assets/chunks/row-1-col-3.jpg'),
  3: require('../../assets/chunks/row-2-col-1.jpg'),
  4: require('../../assets/chunks/row-2-col-2.jpg'),
  5: require('../../assets/chunks/row-2-col-3.jpg'),
  6: require('../../assets/chunks/row-3-col-1.jpg'),
  7: require('../../assets/chunks/row-3-col-2.jpg'),
  8: require('../../assets/chunks/row-3-col-3.jpg'),
};

function getImage(number) {
  return assets[number];
}

function Item(props) {
  const { hole, number, index, width, height } = props;
  function handleClick() {
    props.onClick(index);
  }

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View
        style={[
          styles.tile,
          number === hole && styles.holeStyle,
          { width, height },
        ]}
      >
        <Image source={getImage(number)} style={{ height, width }} />
      </View>
    </TouchableWithoutFeedback>
  );
}

function Items(props) {
  const { rows, cols, hole, width, height } = props;
  const [numbers, setNumbers] = useState(
    shuffle($range(0, rows * cols), hole, rows, cols)
  );

  const solved = useMemo(() => isSolved(numbers), [numbers]);
  const pieceWidth = useMemo(() => Math.round(width / cols), [width, cols]);
  const pieceHeight = useMemo(() => Math.round(height / rows), [height, rows]);

  function handleTileClick(tileIndex) {
    const holeIndex = numbers.indexOf(hole);

    if (canSwap(tileIndex, holeIndex, rows, cols)) {
      const newNumbers = swap(numbers, tileIndex, holeIndex);

      setNumbers(newNumbers);
    }
  }

  if (solved) {
    props.onComplete();
  }

  return (
    <View style={[styles.board, { width, height }]}>
      {numbers.map((number, index) => (
        <Item
          {...props}
          index={index}
          number={number}
          key={number}
          width={pieceWidth}
          height={pieceHeight}
          onClick={handleTileClick}
        />
      ))}
    </View>
  );
}

export default function Puzzle({ onNext }) {
  return (
    <View style={styles.container}>
      <Text>Solve this</Text>
      <Items
        onComplete={onNext}
        rows={3}
        cols={3}
        hole={8}
        width={300}
        height={300}
      />
    </View>
  );
}
