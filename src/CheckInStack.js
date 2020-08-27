import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Right} from './components/Right';
import {Text, StyleSheet, StatusBar} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {soundsArray} from './utils';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
    <CalendarList
      onDayPress={(day) =>
        navigation.navigate('Check In', {
          date: day,
        })
      }
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
