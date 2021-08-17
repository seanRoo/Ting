import React, { useEffect } from 'react';
import GlobalFont from 'react-native-global-font';
import { Providers } from './src/Providers';
import { Root } from 'native-base';

const App = () => {
  // useEffect(() => {
  //   GlobalFont.applyGlobal('Roboto');
  // }, []);
  return (
    <Root>
      <Providers />
    </Root>
  );
};
export default App;
