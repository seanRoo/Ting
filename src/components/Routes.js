import React, { useState, useEffect, useContext } from 'react';
import { AppTabs } from './AppTabs';
import { AuthStack } from '../AuthStack';
import { AuthContext } from '../AuthProvider';
import auth from '@react-native-firebase/auth';
import Loading from './Loading';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateDiscussion } from './Discussions/CreateDiscussion';
import ViewDiscussion from './Discussions/ViewDiscussion';
import MapPage from './Map/AddConsultantForm';
import { addDiscussionPost, addReply } from '../api/DiscussionsApi';
import { useToast } from 'native-base';
import { getHeaderTitle } from './Routes.utils';
import CheckIn from './CheckIn/CheckIn';
import { formatDate } from '../utils';
import Recommendations from './MyData/Recommendations';

const Stack = createStackNavigator();
const Routes = () => {
  const toast = useToast();
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

  const handleHeader = ({ route }) => {
    const routeName = getHeaderTitle(route);
    return routeName === 'Discussions' && routeName;
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  const toastId = 'toastId';

  return (
    <>
      {user && !loading && (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={AppTabs}
            options={({ route }) => ({
              headerTitle: handleHeader({ route }),
              headerShown: false,
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
                    const { messageHeader, messageBody } = params.message;
                    if (messageHeader?.length && messageBody?.length) {
                      addDiscussionPost(params.message);
                      navigation.navigate('Discussions');
                    } else {
                      if (!toast.isActive(toastId)) {
                        toast.show({
                          title: "Can't post a blank message",
                          status: 'info',
                          id: toastId,
                        });
                      }
                    }
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
                gestureEnabled: false,
              };
            }}
          />
          <Stack.Screen
            name="Add a Consultant"
            component={MapPage}
            options={{
              tabBarVisible: false,
              tabBarOptions: { visible: false },
            }}
          />
          <Stack.Screen
            name="Relief"
            component={Recommendations}
            options={{
              tabBarVisible: false,
              tabBarOptions: { visible: false },
            }}
          />
        </Stack.Navigator>
      )}
      {!user && !loading && <AuthStack />}
    </>
  );
};
export default Routes;
