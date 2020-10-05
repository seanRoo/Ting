import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './components/Routes';
import {MenuProvider} from 'react-native-popup-menu';

export const Providers = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <Routes />
      </MenuProvider>
    </AuthProvider>
  );
};
