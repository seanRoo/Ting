import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabs, test } from './AppTabs';
import { AuthStack } from '../AuthStack';
import { AuthContext } from '../AuthProvider';
import auth from '@react-native-firebase/auth';
import Loading from './Loading';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateDiscussion } from './Discussions/CreateDiscussion';
import { ViewDiscussion } from './Discussions/ViewDiscussion';
import { addDiscussionPost, addReply } from '../api/DiscussionsApi';
import { Icon } from 'native-base';
import { getHeaderTitle, options } from './Routes.utils';
import CheckIn from './CheckIn/CheckIn';
import { formatDate } from '../utils';

const Stack = createStackNavigator();
const Routes = () => {
  const { logout } = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(userEvent) {
    setUser(userEvent);
    if (initializing) {
      setInitializing(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {user && !loading && (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={AppTabs}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
              headerRight: () => {
                return (
                  <TouchableOpacity
                    onPress={logout}
                    style={{ paddingRight: 20 }}
                  >
                    <Text>Logout</Text>
                  </TouchableOpacity>
                );
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity style={{ paddingLeft: 20 }}>
                    <Icon name="person-circle" />
                  </TouchableOpacity>
                );
              },
            })}
          />
          <Stack.Screen
            name="Create Discussion"
            component={CreateDiscussion}
            options={({ route: { params }, navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Discussions')}
                >
                  <MaterialCommunityIcons
                    style={{ fontSize: 26, marginLeft: 10 }}
                    name="close"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    addDiscussionPost(params.message);
                    navigation.navigate('Discussions');
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ fontSize: 26, marginRight: 10 }}
                    name="send"
                  />
                </TouchableOpacity>
              ),
              tabBarOptions: { visible: false },
              tabBarVisible: false,
              headerTitle: 'Add a post',
            })}
          />
          <Stack.Screen
            name="View Discussion"
            component={ViewDiscussion}
            options={({ route: { params } }) => ({
              headerTitle: 'Post',
              headerRight: () => {
                return (
                  <TouchableOpacity
                    disabled={params.disabled}
                    onPress={() => {
                      addReply(params.replyMessage);
                      params.setKeyboardText(null);
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{
                        fontSize: 26,
                        marginRight: 10,
                        color: params.disabled === true ? '#dddddd' : 'black',
                      }}
                      name="send"
                    />
                  </TouchableOpacity>
                );
              },
            })}
          />
          <Stack.Screen
            name="Check In"
            component={CheckIn}
            options={({ route }) => {
              const checkInDate = formatDate(route.params.date);
              const dateLocaleString = checkInDate;
              return {
                headerTitle: dateLocaleString,
              };
            }}
          />
        </Stack.Navigator>
      )}
      {!user && !loading && <AuthStack />}
    </>
  );
};
export default Routes;
