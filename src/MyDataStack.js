import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyData from './components/MyData/MyData';
import DataDisplay from './components/MyData/DataDisplay';

const Stack = createStackNavigator();

export const MyDataStack = () => {
  return (
    <Stack.Navigator initialRouteName="Data">
      <Stack.Screen
        name="Data"
        component={MyData}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Data Display" component={DataDisplay} />
    </Stack.Navigator>
  );
};
