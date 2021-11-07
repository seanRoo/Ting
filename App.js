import React from 'react';
import { Providers } from './src/Providers';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <Providers />
    </NativeBaseProvider>
  );
};
export default App;
