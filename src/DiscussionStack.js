import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Discussions } from './components/Discussions/Discussions';

const Stack = createStackNavigator();
export const DiscussionStack = () => {
  return (
    <Stack.Navigator initialRouteName="Discussions">
      <Stack.Screen
        name="Discussions"
        component={Discussions}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
