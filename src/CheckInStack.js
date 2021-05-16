import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckIn from './components/CheckIn/CheckIn';

const Stack = createStackNavigator();

export const CheckInStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Check In"
      screenOptions={{ gesturesEnabled: false }}
    >
      <Stack.Screen
        name="Check In"
        component={CheckIn}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
