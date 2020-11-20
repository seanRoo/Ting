import React, { useState } from 'react';
import { createUser } from './api/UserApi';
import auth from '@react-native-firebase/auth';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        login: async (email, password) => {
          try {
            setLoading(true);
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then((e) => console.log(e));
          } catch (e) {
            console.log(e);
            setLoading(false);
            setError(true);
          }
        },
        register: async (email, password, firstName, lastName, userName) => {
          try {
            setLoading(true);
            let res = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            if (res) {
              createUser({
                userName,
                firstName,
                lastName,
                userId: res.user.uid,
              });
            }
          } catch (e) {
            console.log(e);
            setLoading(false);
            setError(true);
          }
        },
        logout: async () => {
          try {
            setLoading(true);
            await auth().signOut();
          } catch (e) {
            console.error(e);
            setLoading(false);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
