import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useBasket from '../../hooks/useBasket';

function Product() {
  const basket = useBasket();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_URL}/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') setProduct(data.product);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <ul>
      <li>
        <Link to="/basket">View Basket</Link>
        {` (${basket.basketId})`}
      </li>
      <li><h2>{product.name}</h2></li>
      <li>{product.description}</li>
      <li>{product.grossPrice}</li>
    </ul>
  );
}

export default Product;
