// Functions
import { priceFormat } from '@stebunting/library';

// Types
import { GaEcommerceItem } from '../types/GaEcommerceItem';
import { GaEcommerceEvent } from '../types/GaEcommerceEvent';
import { BasketItem } from '../types/Basket';
import { Product } from '../types/Product';
import { Statement } from '../types/Statement';

// Declare GTM dataLayer array
declare global {
  interface Window {
    dataLayer: Array<GaEcommerceEvent>
  }
}

// Return Analytics items array from products
function getItemsFromProducts(products: Array<Product>, quantity: number): Array<GaEcommerceItem> {
  return products.map((product) => ({
    item_id: product.slug,
    item_name: product.name,
    affiliation: 'Whisk Online Store',
    price: priceFormat(product.grossPrice, {
      includeSymbol: false,
      includeOre: true
    }),
    item_brand: product.brand,
    item_category: product.category,
    quantity: quantity.toString(),
    currency: 'SEK'
  }));
}

// Return Analytics items array from items
function getItemsFromItems(
  items: Array<BasketItem>, purchaseEvent = false
): Array<GaEcommerceItem> {
  return items.map((item) => ({
    item_id: item.details.slug,
    item_name: item.details.name,
    affiliation: 'Whisk Online Store',
    [purchaseEvent ? 'item_price' : 'price']: priceFormat(item.details.grossPrice, {
      includeSymbol: false,
      includeOre: true
    }),
    item_brand: item.details.brand,
    item_category: item.details.category,
    quantity: item.quantity.toString(),
    currency: 'SEK'
  }));
}

// Record view of product details
export function viewItemGaEvent(product: Product): void {
  window.dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromProducts([product], 1)
    }
  });
}

// Record add product to basket
export function addToBasketGaEvent(product: Product, quantity: number): void {
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromProducts([product], quantity)
    }
  });
}

// Record add product to basket
export function addItemToBasketGaEvent(item: BasketItem, quantity: number): void {
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromItems([{ ...item, quantity }])
    }
  });
}

// Record remove product from basket
export function removeItemFromBasketGaEvent(item: BasketItem, quantity: number): void {
  window.dataLayer.push({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromItems([{ ...item, quantity }])
    }
  });
}

export function beginCheckoutGaEvent(items: Array<BasketItem>, statement: Statement): void {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      purchase: {
        value: priceFormat(statement.bottomLine.totalPrice, {
          includeOre: true,
          includeSymbol: false
        }),
        currency: 'SEK',
        items: getItemsFromItems(items)
      }
    }
  });
}

export function purchaseGaEvent(
  items: Array<BasketItem>, statement: Statement, orderId: string
): void {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      purchase: {
        transaction_id: orderId,
        affiliation: 'Whisk Online Store',
        value: priceFormat(statement.bottomLine.totalPrice, {
          includeOre: true,
          includeSymbol: false
        }),
        tax: priceFormat(statement.bottomLine.totalMoms, {
          includeOre: true,
          includeSymbol: false
        }),
        shipping: priceFormat(statement.bottomLine.totalDelivery, {
          includeOre: true,
          includeSymbol: false
        }),
        currency: 'SEK',
        items: getItemsFromItems(items, true)
      }
    }
  });
}
