import React from 'react';
import { Text } from 'react-native';

const TextCustomFont = (props) => {
  return (
    <Text style={{ fontFamily: 'Roboto' }} {...props}>
      {props.children}
    </Text>
  );
};

export default TextCustomFont;
