import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { Discussions } from './components/Discussions/Discussions';

const Stack = createStackNavigator();
export const DiscussionStack = () => {
  return (
    <Stack.Navigator initialRouteName="Discussions">
      <Stack.Screen
        name="Discussions"
        component={Discussions}
        options={({ route }) => ({
          headerRight: () => {
            const { params } = route;
            return (
              <TouchableOpacity onPress={() => params.handleFilterChange()}>
                <MaterialCommunityIcons
                  style={{ marginRight: 12 }}
                  name="filter-variant"
                  color="black"
                  size={35}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};
