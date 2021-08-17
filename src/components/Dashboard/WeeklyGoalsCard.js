import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WeeklyGoalsCard = () => {
  return (
    <View
      style={{
        margin: 2,
        flex: 0.98,
        borderRadius: 10,
        padding: 8,
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: 'orchid',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
      }}
    >
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontSize: 18, color: 'orchid', fontWeight: 'bold' }}>
          Weekly Goals
        </Text>
        <MaterialCommunityIcons
          style={{
            position: 'absolute',
            right: 0,
          }}
          size={24}
          name="clipboard-list-outline"
          color="orchid"
        />
      </View>
    </View>
  );
};

export default WeeklyGoalsCard;
