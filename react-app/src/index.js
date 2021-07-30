import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { SelectedBoardContext, SelectedBoardProvider } from './context/SelectedBoard';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SelectedBoardProvider>
        <App />
      </SelectedBoardProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
