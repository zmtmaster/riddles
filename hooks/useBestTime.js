import { AsyncStorage } from 'react-native';
import { useEffect, useState } from 'react';

export default function useBestTime(time) {
  const [best, setBest] = useState();

  useEffect(() => {
    async function getFromStorage() {
      const $time = await AsyncStorage.getItem('best');

      if ($time) {
        setBest($time);
      } else {
        setBest('00:00');
      }
    }

    getFromStorage();
  }, []);
  useEffect(() => {
    async function setToStorage($time) {
      await AsyncStorage.setItem('best', $time);
    }

    if (time) {
      if (time < best) {
        setBest(time);
        setToStorage(time);
      }
    }
  }, [time, best]);

  return best;
}
