import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store'
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import ToastProvider from './providers/ToastProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <ToastProvider/>
          <App/>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
);