import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Center } from './Center';

const Loading = () => {
  return (
    <Center>
      <ActivityIndicator size="large" color="#6646ee" />
    </Center>
  );
};
export default Loading;
