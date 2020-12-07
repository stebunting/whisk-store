const types = {
  // API Actions
  BEGIN_API_CALL: 'BEGIN_API_CALL',

  // Product Actions
  LOAD_PRODUCTS_SUCCESS: 'LOAD_PRODUCTS_SUCCESS',

  // Basket Actions
  LOAD_BASKET_SUCCESS: 'LOAD_BASKET_SUCCESS',
  UPDATE_BASKET_SUCCESS: 'UPDATE_BASKET_SUCCESS',
  UPDATE_BASKET_ZONE_SUCCESS: 'UPDATE_BASKET_ZONE_SUCCESS',
  REMOVE_ITEM_FROM_BASKET_SUCCESS: 'REMOVE_ITEM_FROM_BASKET_SUCCESS',
  RESET_BASKET_SUCCESS: 'RESET_BASKET_SUCCESS',
  APPEND_PRODUCTS_TO_BASKET: 'APPEND_PRODUCTS_TO_BASKET',

  // User Actions
  UPDATE_USER_FIELD: 'UPDATE_USER_FIELD',
  UPDATE_USER_ADDRESS: 'UPDATE_USER_ADDRESS',

  // Form Actions
  UPDATE_VALIDITY: 'UPDATE_VALIDITY',
  UPDATE_VALIDITY_ALL: 'UPDATE_VALIDITY_ALL'
}

export default types;
