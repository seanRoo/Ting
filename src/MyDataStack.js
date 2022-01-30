import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyData from './components/MyData/MyData';
import Recommendations from './components/MyData/Recommendations';
import DataDisplay from './components/MyData/DataDisplay';

const Stack = createStackNavigator();

export const MyDataStack = () => {
  return (
    <Stack.Navigator initialRouteName="My Data">
      <Stack.Screen
        name="My Data"
        component={MyData}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Data Display" component={DataDisplay} />
      <Stack.Screen name="Relief" component={Recommendations} />
    </Stack.Navigator>
  );
};
