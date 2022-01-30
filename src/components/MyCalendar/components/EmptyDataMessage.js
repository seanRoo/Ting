import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextCustomFont from '../../TextCustomFont';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const EmptyDataMessage = ({ handleClick, selectedDate }) => (
  <View
    style={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0.7,
    }}
  >
    <MaterialCommunityIcons name="calendar-blank" size={100} color="orchid" />
    <TextCustomFont style={{ marginBottom: 6, fontSize: 16 }}>
      {new Date(selectedDate).toLocaleDateString('en-US', options)}
    </TextCustomFont>
    <TextCustomFont
      style={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 22,
      }}
    >
      No check-in data found for this date
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
  </View>
);

export default EmptyDataMessage;
