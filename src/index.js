import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { StoreProvider } from './Store';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
