import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import {Center} from './components/Center';
import {AuthContext} from './AuthProvider';

const Stack = createStackNavigator();

// const Home = ({navigation: {navigate}}) => {
//   return (
//     <Center>
//       <Text>carolinnbe</Text>
//       <Button
//         title="Go to About"
//         onPress={() => {
//           navigate('About');
//         }}
//       />
//     </Center>
//   );
// };

// const About = ({navigation: {navigate}}) => {
//   return (
//     <Center>
//       <Text>I am about</Text>
//       <Button
//         title="Go to Home"
//         onPress={() => {
//           navigate('Home');
//         }}
//       />
//     </Center>
//   );
// };

const Login = ({navigation: {navigate}}) => {
  const {login} = useContext(AuthContext);
  return (
    <Center>
      <Text>I am Log in</Text>
      <Button onPress={login} title="Log me in" />
    </Center>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{gestureEnabled: false, header: () => null}}>
      <Stack.Screen
        name="Log in"
        component={Login}
        options={{title: 'Log In'}}
      />
      {/* <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} /> */}
    </Stack.Navigator>
  );
};
