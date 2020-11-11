import { useState, useEffect, useMemo } from 'react';
import Cookies from 'universal-cookie';

function useBasket() {
  const cookieName = 'basketId';
  const cookies = useMemo(() => new Cookies(), []);

  const [basket, setBasket] = useState({});
  useEffect(() => {
    const basketId = cookies.get(cookieName);
    const url = basketId
      ? `${process.env.API_URL}/api/basket/${basketId}`
      : `${process.env.API_URL}/api/basket`;
    const method = basketId != null ? 'get' : 'post';

    fetch(url, { method })
      .then((response) => response.json())
      .then((data) => {
        cookies.set(cookieName, data.basket.basketId, { path: '/' });
        setBasket(data.basket);
      })
      .catch((error) => console.error(error));
  }, [cookies]);

  return basket;
}

export default useBasket;
