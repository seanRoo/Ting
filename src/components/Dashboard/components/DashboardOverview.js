import React from 'react';
import { View, Text } from 'react-native';
import MyCalendar from '../../MyCalendar/MyCalendar';
import MyCalendarCard from '../MyCalendarCard';
import WeeklyGoalsCard from '../WeeklyGoalsCard';

const DashboardOverview = ({
  navigation,
  monthYearString,
  checkedIn,
  today,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        {/* <View style={{ flex: 0.5 }}>
          <MyCalendarCard
            handleClick={() =>
              !checkedIn
                ? navigation.push('Check In', {
                    date: today,
                    monthYearString: monthYearString,
                  })
                : navigation.navigate('My Calendar', { dashboardDate: today })
            }
            checkedIn={checkedIn}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <WeeklyGoalsCard />
        </View> */}
        <MyCalendar navigation={navigation} />
      </View>
    </View>
  );
};

export default DashboardOverview;
