import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Discussions } from './components/Discussions/Discussions';
import { CreateDiscussion } from './components/Discussions/CreateDiscussion';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions } from '@react-navigation/native';

const Stack = createStackNavigator();

export const DiscussionStack = ({ navigation: { dispatch } }) => {
  const popAction = StackActions.pop();
  return (
    <Stack.Navigator initialRouteName="Discussions">
      <Stack.Screen name="Discussions" component={Discussions} />
      <Stack.Screen
        name="Create Discussion"
        component={CreateDiscussion}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => dispatch(popAction)}>
              <MaterialCommunityIcons
                style={{ fontSize: 26, marginLeft: 10 }}
                name="close"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              style={{ fontSize: 26, marginRight: 10 }}
              name="send"
            />
          ),
          tabBarOptions: { visible: false },
          headerTitle: false,
        }}
      />
    </Stack.Navigator>
  );
};
