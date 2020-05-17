import { useState, useEffect } from 'react';

function leftPad(seconds) {
  if (seconds < 10) {
    return `0${seconds}`;
  }

  return seconds;
}

function format(seconds) {
  if (seconds < 60) {
    return `00:${leftPad(seconds)}`;
  }

  return `${leftPad(Math.floor(seconds / 60))}:${leftPad(seconds % 60)}`;
}

export default function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return { string: format(counter), seconds: counter };
}
