import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from './components/Center';
import {TouchableOpacity, Text} from 'react-native';
import {AuthContext} from './AuthProvider';
import {Button} from 'native-base';
import {MyData} from './components/AppTabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CheckInStack} from './CheckInStack';
import Dashboard from './components/Dashboard';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const Product = ({route, navigation}) => {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit This Product"
        onPress={() =>
          navigation.navigate('EditProduct', {
            name: route.params.name,
          })
        }
      />
    </Center>
  );
};

export const DashboardStack = () => {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}) => ({
          headerTitle: `Product: ${route.params.name}`,
        })}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          },
        }}
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
