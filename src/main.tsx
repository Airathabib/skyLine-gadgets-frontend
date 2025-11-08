import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from '@/store/index.ts';
import CardContextProvider from '@/context/Context.js';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <CardContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CardContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
