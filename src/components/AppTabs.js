import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardStack} from '../DashboardStack';
import {CheckInStack} from '../CheckInStack';
import {Center} from './Center';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

const Tabs = createBottomTabNavigator();

export const MyData = () => {
  return (
    <Center>
      <Text>My Data</Text>
    </Center>
  );
};

const Share = () => {
  return (
    <Center>
      <Text>Share</Text>
    </Center>
  );
};
export const AppTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Dashboard') {
            return (
              <MaterialCommunityIcons
                name={'view-dashboard-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'My Data') {
            return <Foundation name="graph-bar" size={size} color={color} />;
          } else if (route.name === 'Check In') {
            return (
              <MaterialCommunityIcons
                name="calendar-multiple-check"
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Share') {
            return (
              <MaterialCommunityIcons
                name="share-variant"
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tabs.Screen name="Dashboard" component={DashboardStack} />
      <Tabs.Screen name="Check In" component={CheckInStack} />
      <Tabs.Screen name="My Data" component={MyData} />
      <Tabs.Screen name="Share" component={Share} />
    </Tabs.Navigator>
  );
};
