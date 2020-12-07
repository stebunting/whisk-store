/* global dataLayer */
import { priceFormat } from './helpers';

// Return Analytics items array from products
function getItemsFromProducts(products) {
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
    quantity: product.quantity.toString(),
    currency: 'SEK'
  }));
}

// Return Analytics items array from items
function getItemsFromItems(items) {
  return items.map((item) => ({
    item_id: item.details.slug,
    item_name: item.details.name,
    affiliation: 'Whisk Online Store',
    price: priceFormat(item.details.grossPrice, {
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
export function viewItemGaEvent(product) {
  dataLayer.push({
    event: 'view_item',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromProducts([{ ...product, quantity: 1 }])
    }
  });
}

// Record add product to basket
export function addToBasketGaEvent(product, quantity) {
  dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromProducts([{ ...product, quantity }])
    }
  });
}

// Record add product to basket
export function addItemToBasketGaEvent(item, quantity) {
  dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromItems([{ ...item, quantity }])
    }
  });
}

// Record remove product from basket
export function removeItemFromBasketGaEvent(item, quantity) {
  dataLayer.push({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'SEK',
      items: getItemsFromItems([{ ...item, quantity }])
    }
  });
}

export function beginCheckoutGaEvent(items, bottomLine) {
  dataLayer.push({
    event: 'purchase',
    ecommerce: {
      purchase: {
        value: priceFormat(bottomLine.totalPrice, {
          includeOre: true,
          includeSymbol: false
        }),
        currency: 'SEK',
        items: getItemsFromItems(items)
      }
    }
  });
}

export function purchaseGaEvent(items, bottomLine, orderId) {
  dataLayer.push({
    event: 'purchase',
    ecommerce: {
      purchase: {
        transaction_id: orderId,
        affiliation: 'Whisk Online Store',
        value: priceFormat(bottomLine.totalPrice, {
          includeOre: true,
          includeSymbol: false
        }),
        tax: priceFormat(bottomLine.totalMoms, {
          includeOre: true,
          includeSymbol: false
        }),
        shipping: priceFormat(bottomLine.totalDelivery, {
          includeOre: true,
          includeSymbol: false
        }),
        currency: 'SEK',
        items: getItemsFromItems(items)
      }
    }
  });
}
