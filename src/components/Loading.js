import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Center} from './Center';

const Loading = () => {
  return (
    <Center>
      <ActivityIndicator size="large" color="#6646ee" />
    </Center>
  );
};
export default Loading;
