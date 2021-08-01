import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { SelectedBoardProvider } from './context/SelectedBoard';
import { ModalProvider } from "./context/Modal";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SelectedBoardProvider>
        <ModalProvider>
        <App />
        </ModalProvider>
      </SelectedBoardProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
