import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './components/App.jsx';
import './styles.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);