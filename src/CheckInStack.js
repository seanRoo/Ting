import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyCalendar from './components/MyCalendar/MyCalendar';

const Stack = createStackNavigator();

export const CheckInStack = () => {
  return (
    <Stack.Navigator initialRouteName="My Calendar">
      <Stack.Screen
        name="My Calendar"
        component={MyCalendar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
