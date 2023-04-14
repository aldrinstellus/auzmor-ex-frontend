import React from 'react';
import './App.css';
import Router from './components/Router';
import AuthProvider from 'contexts/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from 'utils/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
