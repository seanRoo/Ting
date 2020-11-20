import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './components/Routes';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';

export const Providers = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </MenuProvider>
    </AuthProvider>
  );
};
