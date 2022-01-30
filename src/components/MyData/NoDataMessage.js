import React from 'react';
import { View, Text } from 'react-native';
import { Center } from '../Center';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NoDataMessage = () => {
  return (
    <View
      style={{
        flex: 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <MaterialCommunityIcons
        name="folder-open-outline"
        size={100}
        color="orchid"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 22,
        }}
      >
        No data found for this month
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>
        Try updating the month above or adding check-in data in your{' '}
        <Text style={{ fontWeight: 'bold' }}>Dashboard</Text>
      </Text>
    </View>
  );
};

export default NoDataMessage;
