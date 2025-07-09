import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>   {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Optional: measure performance
reportWebVitals();
