// Requirements
import Cookies from 'universal-cookie';

// Types
import { Basket } from '../types/Basket';
import { Product } from '../types/Product';
import { SwishResponse } from '../types/SwishStatus';
import { User } from '../types/User';

declare global {
  const API_URL: string;
}

const cookieName = 'basketId';
const cookies = new Cookies();

// Get Product List from Backend
export function getProducts(): Promise<Array<Product>> {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.products);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Get single product from backend
export function getProduct(slug: string): Promise<Array<Product>> {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/product/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.products);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Get Basket from id in cookie
export function getBasket(): Promise<Basket> {
  const basketId: string = cookies.get(cookieName);

  const url = basketId
    ? `${API_URL}/api/basket/${basketId}`
    : `${API_URL}/api/basket`;
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

export function resetBasket(): Promise<Basket> {
  const basketId: string = cookies.get(cookieName);
  const url = `${API_URL}/api/basket/${basketId}`;

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
export interface UpdateBasketPayload {
  productSlug: string
  quantity?: number,
  deliveryType: string,
  deliveryDate: string,
}

export function updateBasketApi(payload: UpdateBasketPayload): Promise<Basket> {
  const basketId: string = cookies.get(cookieName);

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/basket/update/quantity/${basketId}`, {
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
export function updateBasketZone(address: string, zone: number): Promise<Basket> {
  const basketId: string = cookies.get(cookieName);

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/basket/update/zone/${basketId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: { address, zone } })
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.basket);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Remove item from basket in backend, returns new basket
export function removeItemFromBasketApi(payload: UpdateBasketPayload): Promise<Basket> {
  const basketId: string = cookies.get(cookieName);

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/basket/update/remove/${basketId}`, {
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

interface PaymentLinkOrderStatus {
  orderId: string,
  status: 'PAID',
  paymentMethod: 'paymentLink'
}

interface SwishOrderStatusCreated {
  status: 'CREATED',
  id: string,
  paymentMethod: 'swish'
}

// Send completed order to backend
export function sendOrder(
  user: User
): Promise<PaymentLinkOrderStatus | SwishOrderStatusCreated | SwishResponse> {
  const basketId: string = cookies.get(cookieName);

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/order/${basketId}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.order);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}

// Send completed order to backend
export function checkSwishStatus(
  swishId: string
): Promise<SwishOrderStatusCreated | SwishResponse> {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/order/swish/${swishId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') resolve(data.order);
        reject(new Error());
      }).catch((error) => reject(error));
  });
}
