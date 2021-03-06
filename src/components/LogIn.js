import React, { useContext, useState } from 'react';
import { Text, Form, Item, Input, Label, Button, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { Center } from './Center';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';

const Login = ({ navigation: { navigate } }) => {
  const { login, error, setError } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emptyStringError, setEmptyStringError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const handleLogIn = () => {
    if (email && password) {
      login(email, password);
    } else {
      setEmptyStringError(true);
    }
  };

  const handleTextChange = (email) => {
    setEmail(email);
  };

  const handleFocus = () => {
    setError(false);
    setEmailFieldError(false);
  };

  return (
    <View style={LoginStyles.container}>
      <View>
        <Text style={LoginStyles.header}>Ting!</Text>
      </View>
      <Form>
        <Item
          style={LoginStyles.inputFields}
          floatingLabel
          error={emailFieldError}
        >
          <Label>Email</Label>
          <Input
            onChangeText={(email) => handleTextChange(email)}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            onFocus={handleFocus}
            value={email}
            onBlur={() => {
              if (
                email &&
                !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
              ) {
                setEmailFieldError(true);
              } else {
                setEmailFieldError(false);
              }
            }}
          />
          {emailFieldError && <Icon name="alert-circle-outline" />}
        </Item>
        <Item style={LoginStyles.inputFields} floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            onFocus={() => setError(false)}
          />
        </Item>
        {error && (
          <>
            <Text style={LoginStyles.loginErrorText}>
              Incorrect Email or Password.
            </Text>
            <Text style={LoginStyles.loginErrorText}>Try Again.</Text>
          </>
        )}
        {emptyStringError && (
          <>
            <Text style={LoginStyles.loginErrorText}>
              Fields Cannot be Blank.
            </Text>
            <Text style={LoginStyles.loginErrorText}>Try Again.</Text>
          </>
        )}
        <View>
          <Button onPress={handleLogIn} style={LoginStyles.loginButton}>
            <Center>
              <Text>Log In</Text>
            </Center>
          </Button>
          <TouchableOpacity
            style={LoginStyles.registerButton}
            onPress={() => navigate('Register')}
          >
            <Text>New User? Register Here</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  );
};

const LoginStyles = ScaledSheet.create({
  inputFields: {
    width: '220@s',
  },
  loginButton: {
    marginTop: '30@s',
    alignSelf: 'center',
    width: '200@s',
  },
  registerButton: {
    alignSelf: 'center',
    paddingTop: '20@s',
  },
  header: {
    fontSize: '26@s',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginErrorText: { alignSelf: 'center', paddingTop: '10@s', color: 'red' },
});

export default Login;
