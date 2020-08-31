import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, StatusBar} from 'react-native';
import {Calendar} from 'react-native-calendars';
import SleepList from './components/SleepList';
import CheckIn from './components/CheckIn';
import SoundList from './components/SoundList';

const Stack = createStackNavigator();

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const MyCalendar = ({navigation}) => {
  return (
    <Calendar
      onDayPress={(day) =>
        navigation.navigate('Check In', {
          date: day,
        })
      }
      hideArrows={false}
      hideExtraDays={true}
    />
  );
};

export const CheckInStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyCalendar">
      <Stack.Screen name="My Calendar" component={MyCalendar} />
      <Stack.Screen
        name="Check In"
        component={CheckIn}
        options={({route, navigation}) => {
          const checkInDate = new Date(route.params.date.dateString);
          const dateLocaleString = checkInDate.toLocaleDateString(
            'en-US',
            options,
          );
          return {
            headerTitle: dateLocaleString,
          };
        }}
      />
      <Stack.Screen name="Sound List" component={SoundList} />
      <Stack.Screen name="Sleep List" component={SleepList} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
  },
});
