import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { VersionProvider } from 'providers';
import { AuthProvider } from 'providers/AuthContext';
import { MenuProvider } from 'providers/MenuContext';
import { queryClient } from 'utils';
import App from './App';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <MenuProvider>
            <VersionProvider>
              <App />
            </VersionProvider>
          </MenuProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
