import React from 'react';
import { View, Text } from 'react-native';
import { Center } from '../../Center';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmptyDataMessage = ({ handleClick }) => (
  <View style={{ flexDirection: 'column' }}>
    <Center>
      <MaterialCommunityIcons name="calendar-blank" size={100} color="orchid" />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 22,
        }}
      >
        No Data Found for This Date
      </Text>
      <TouchableOpacity
        onPress={handleClick}
        style={{
          borderWidth: 1,
          borderColor: 'blue',
          padding: 10,
          borderRadius: 15,
        }}
      >
        <Text>Add Check In</Text>
      </TouchableOpacity>
    </Center>
  </View>
);

export default EmptyDataMessage;
