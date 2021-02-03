// Requirements
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Config
import configureStore from './lib/redux';

// Components
import App from './views/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
