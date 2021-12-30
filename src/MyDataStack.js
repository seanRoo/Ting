import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyData from './components/MyData/MyData';
import Recommendations from './components/MyData/Recommendations';

const Stack = createStackNavigator();

export const MyDataStack = () => {
  return (
    <Stack.Navigator initialRouteName="My Data">
      <Stack.Screen
        name="My Data"
        component={MyData}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Recommendations" component={Recommendations} />
    </Stack.Navigator>
  );
};
