import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { AuthContext } from './AuthProvider';
import { Icon } from 'native-base';
import { MyData } from './components/AppTabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CheckInStack } from './CheckInStack';
import Dashboard from './components/Dashboard';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const DashboardStack = (props) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export const QuickNavigationStack = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Check In" component={CheckInStack} />
      <Tabs.Screen name="My Data" component={MyData} />
    </Tabs.Navigator>
  );
};
