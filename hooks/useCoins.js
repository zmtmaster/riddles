import { useEffect, useState } from 'react';

function useCoins() {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(100);
  }, []);

  return { amount };
}

export default useCoins;
