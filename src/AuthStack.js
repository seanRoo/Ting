import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './components/LogIn';
import Register from './components/Register';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{gestureEnabled: false, header: () => null}}>
      <Stack.Screen
        name="Log in"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register'}}
      />
    </Stack.Navigator>
  );
};
