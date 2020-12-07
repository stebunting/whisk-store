import Cookies from 'universal-cookie';

const cookieName = 'basketId';
const cookies = new Cookies();
const apiUrl = process.env.API_URL;

// Get Product List from Backend
export function getProducts() {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.products);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Get Basket from id in cookie
export function getBasket() {
  // cookies.remove(cookieName, { path: '/' });
  const basketId = cookies.get(cookieName);
  const url = basketId
    ? `${apiUrl}/api/basket/${basketId}`
    : `${apiUrl}/api/basket`;
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
      }).catch((error) => reject(error));
  });
}

export function resetBasket() {
  const basketId = cookies.get(cookieName);
  const url = `${apiUrl}/api/basket/${basketId}`;

  return new Promise((resolve, reject) => {
    fetch(url, { method: 'delete' })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          cookies.set(cookieName, data.basket.basketId, { path: '/' });
          resolve(data.basket);
        }
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Update basket in backend, returns new basket
export function updateBasketApi(payload) {
  const basketId = cookies.get(cookieName);
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/basket/update/quantity/${basketId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          cookies.set(cookieName, data.basket.basketId, { path: '/' });
          resolve(data.basket);
        }
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Update basket in backend, returns new basket
export function updateBasketZoneApi(location) {
  const basketId = cookies.get(cookieName);
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/basket/update/zone/${basketId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location })
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.basket);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Remove item from basket in backend, returns new basket
export function removeItemFromBasketApi(payload) {
  const basketId = cookies.get(cookieName);
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/basket/update/remove/${basketId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.basket);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Send completed order to backend
export function sendOrder(payload) {
  const basketId = cookies.get(cookieName);
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/order/${basketId}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.order);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Send completed order to backend
export function checkSwishStatus(swishId) {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/order/swish/${swishId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.order);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}
