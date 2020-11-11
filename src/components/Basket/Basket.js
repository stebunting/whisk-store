import React from 'react';
import useBasket from '../../hooks/useBasket';

function Basket() {
  const basket = useBasket();
  return (
    <ul>
      <li><h2>Basket</h2></li>
      <li>{basket.basketId}</li>
    </ul>
  );
}

export default Basket;
