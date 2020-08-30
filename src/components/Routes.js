import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppTabs} from './AppTabs';
import {AuthStack} from '../AuthStack';
import {AuthContext} from '../AuthProvider';
import auth from '@react-native-firebase/auth';
import Loading from './Loading';

const Routes = () => {
  const {user, setUser, loading, setLoading} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (loading) {
    console.log(true);
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user && <AppTabs />}
      {!user && !loading && <AuthStack />}
    </NavigationContainer>
  );
};
export default Routes;
