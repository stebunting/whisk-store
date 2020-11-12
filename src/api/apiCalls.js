import Cookies from 'universal-cookie';

const cookieName = 'basketId';
const cookies = new Cookies();

export function getProducts() {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.products);
        reject(new Error());
      })
      .catch((error) => reject(error));
  });
}

export function getBasket() {
  // cookies.remove(cookieName, { path: '/' });
  const basketId = cookies.get(cookieName);

  const url = basketId
    ? `${process.env.API_URL}/api/basket/${basketId}`
    : `${process.env.API_URL}/api/basket`;
  const method = basketId != null ? 'get' : 'post';

  return new Promise((resolve, reject) => {
    fetch(url, { method })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          cookies.set(cookieName, data.basket.basketId, { path: '/' });
          resolve(data.basket);
        }
        reject(new Error());
      })
      .catch((error) => reject(error));
  });
}

export function updateBasketApi(productId, quantity) {
  const basketId = cookies.get(cookieName);
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_URL}/api/basket/${basketId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.basket);
        reject(new Error());
      }).catch((error) => {
        reject(error);
      });
  });
}
