import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';

export const AuthContext = React.createContext({
  user: '',
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = {username: 'Bob'};
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem('user', '');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
