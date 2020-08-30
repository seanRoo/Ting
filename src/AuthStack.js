import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import {Center} from './components/Center';
import {AuthContext} from './AuthProvider';
import Login from './components/LogIn';
import Register from './components/Register';

const Stack = createStackNavigator();

// const Login = ({navigation: {navigate}}) => {
//   const {login} = useContext(AuthContext);
//   return (
//     <Center>
//       <Text>I am Log in</Text>
//       <Button onPress={login} title="Log me in" />
//     </Center>
//   );
// };

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
