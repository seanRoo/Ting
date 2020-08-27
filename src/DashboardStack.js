import React, {useContext, useRef, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from './components/Center';
import {TouchableOpacity, FlatList, Text, View, Dimensions} from 'react-native';
import {AuthContext} from './AuthProvider';
import faker from 'faker';
import {
  Icon,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Button,
} from 'native-base';
import {LineChart} from 'react-native-chart-kit';
import {Right} from './components/Right';
import {MyCalendar} from './CheckInStack';
import {MyData} from './components/AppTabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CheckInStack} from './CheckInStack';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const Feed = ({navigation}) => {
  return (
    <Container style={{padding: 5}}>
      <Content>
        <Card>
          <CardItem header>
            <Text style={{fontWeight: 'bold'}}>Reminders</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{fontSize: 20}}>
                You Have
                <Text style={{fontWeight: 'bold'}}> 2</Text> Incomplete
                Check-Ins
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Right>
              <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <Button
                  transparent
                  light
                  onPress={() => navigation.navigate('Check In')}>
                  <Text
                    style={{
                      padding: 5,
                      borderRadius: 10,
                      fontSize: 16,
                      paddingLeft: 12,
                      paddingRight: 0,
                    }}>
                    Go To Calendar
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    style={{
                      fontSize: 18,
                      color: 'black',
                    }}
                  />
                </Button>
              </TouchableOpacity>
            </Right>
          </CardItem>
        </Card>
        <Card>
          <Text style={{padding: 10, fontWeight: 'bold'}}>My Data</Text>
          <CardItem style={{paddingLeft: 5, paddingRight: 5}}>
            <Body style={{textAlign: 'center'}}>
              <LineChart
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 25} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
              />
            </Body>
          </CardItem>
          <CardItem footer style={{height: 50}}>
            <Right>
              <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <Button
                  transparent
                  light
                  onPress={() => navigation.navigate('My Data')}>
                  <Text
                    style={{
                      borderRadius: 10,
                      fontSize: 16,
                      paddingLeft: 12,
                      paddingRight: 0,
                    }}>
                    Go To My Data
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    style={{
                      fontSize: 18,
                      color: 'black',
                    }}
                  />
                </Button>
              </TouchableOpacity>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

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

const apiCall = (x) => {
  return x;
};

const EditProduct = ({route, navigation}) => {
  const [formState, setFormState] = useState();
  const submit = useRef(() => {});

  submit.current = () => {
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({submit});
  }, []);
  return (
    <Center>
      <Text>editing {route.params.name}...</Text>
    </Center>
  );
};

export const DashboardStack = () => {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}) => ({
          headerTitle: `Product: ${route.params.name}`,
        })}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
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
