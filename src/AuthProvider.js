import React, { useState } from 'react';
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
        register: async (email, password) => {
          try {
            setLoading(true);
            await auth().createUserWithEmailAndPassword(email, password);
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
