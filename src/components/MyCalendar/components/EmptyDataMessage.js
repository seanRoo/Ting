import React from 'react';
import { View, Text } from 'react-native';
import { Center } from '../../Center';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextCustomFont from '../../TextCustomFont';

const EmptyDataMessage = ({ handleClick }) => (
  <View style={{ flexDirection: 'column' }}>
    <Center>
      <MaterialCommunityIcons name="calendar-blank" size={100} color="orchid" />
      <TextCustomFont
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 22,
        }}
      >
        No Data Found for This Date
      </TextCustomFont>
      <TouchableOpacity
        onPress={handleClick}
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          padding: 10,
          borderRadius: 15,
        }}
      >
        <TextCustomFont>Add Check In</TextCustomFont>
      </TouchableOpacity>
    </Center>
  </View>
);

export default EmptyDataMessage;
