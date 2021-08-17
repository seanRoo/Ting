import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyData } from './components/AppTabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyCalendarStack } from './MyCalendarStack';
import Dashboard from './components/Dashboard/Dashboard';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const DashboardStack = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export const QuickNavigationStack = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Check In" component={MyCalendarStack} />
      <Tabs.Screen name="My Data" component={MyData} />
    </Tabs.Navigator>
  );
};
