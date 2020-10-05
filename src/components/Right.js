import React from 'react';
import { View } from 'react-native';

export const Right = ({ children, style }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </View>
  );
};
