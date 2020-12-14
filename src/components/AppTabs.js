import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardStack } from '../DashboardStack';
import { CheckInStack } from '../CheckInStack';
import { DiscussionStack } from '../DiscussionStack';
import { Center } from './Center';
import { Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { MyDataStack } from '../MyDataStack';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateDiscussion } from './Discussions/CreateDiscussion';
import { ViewDiscussion } from './Discussions/ViewDiscussion';
import { addDiscussionPost } from '../api/DiscussionsApi';
import { StackActions } from '@react-navigation/native';

const Tabs = createBottomTabNavigator();

export const AppTabs = (props) => {
  return (
    <Tabs.Navigator
      tab
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
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
          } else if (route.name === 'Discussions') {
            return (
              <MaterialCommunityIcons
                name="forum-outline"
                size={size}
                color={color}
              />
            );
          }
        },
        navigationOptions: {
          header: null,
        },
      })}
      tabBarOptions={{
        activeTintColor: 'orchid',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Dashboard" component={DashboardStack} />
      <Tabs.Screen name="Check In" component={CheckInStack} />
      <Tabs.Screen name="My Data" component={MyDataStack} />
      <Tabs.Screen name="Discussions" component={DiscussionStack} />
    </Tabs.Navigator>
  );
};
