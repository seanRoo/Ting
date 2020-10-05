import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyData from './components/MyData/MyData';

const Stack = createStackNavigator();

export const MyDataStack = () => {
  return (
    <Stack.Navigator initialRouteName="My Data">
      <Stack.Screen
        name="My Data"
        component={MyData}
        options={() => {
          return {
            headerTitle: 'My Data',
          };
        }}
      />
    </Stack.Navigator>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     borderColor: 'black',
//     borderWidth: 0.5,
//     padding: 20,
//     marginVertical: 8,
//   },
//   title: {
//     fontSize: 16,
//   },
// });
