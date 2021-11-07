import React from 'react';
import { View } from 'react-native';
import MyCalendar from '../../MyCalendar/MyCalendar';

const DashboardOverview = ({ navigation }) => {
  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        borderColor: 'orchid',
        borderWidth: 0.5,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <MyCalendar navigation={navigation} />
      </View>
    </View>
  );
};

export default DashboardOverview;
