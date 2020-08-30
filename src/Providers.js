import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './components/Routes';

export const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
