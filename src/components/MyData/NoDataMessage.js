import React from 'react';
import { Text } from 'react-native';
import { CardItem } from 'native-base';
import { Center } from '../Center';

const NoDataMessage = ({}) => {
  return (
    <CardItem style={{ flex: 0.8 }}>
      <Center>
        <Text>No data found</Text>
        <Text>Have you checked in for this month?</Text>
      </Center>
    </CardItem>
  );
};

export default NoDataMessage;
