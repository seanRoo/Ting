import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
const RecommendationsButton = ({ handleClick }) => (
  <View
    style={{
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'flex-end',
    }}
  >
    <TouchableOpacity
      style={{
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#1c98e6',
      }}
      onPress={handleClick}
    >
      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
        Relief Recommendations
      </Text>
    </TouchableOpacity>
  </View>
);

export default RecommendationsButton;
