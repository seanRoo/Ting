import React, { useContext, useState } from 'react';
import { Text, Form, Item, Input, Label, Button, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { Center } from './Center';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation: { navigate } }) => {
  const { register, error, setError } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [emptyStringError, setEmptyStringError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const handleRegister = () => {
    if (email && password) {
      register(email, password, firstName, lastName, userName).then(() =>
        navigate('Log in'),
      );
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

  const handleUserNameChange = (newUserName) => {
    setUserName(newUserName);
  };
  return (
    <View style={RegisterStyles.container}>
      <View>
        <Text style={RegisterStyles.header}>Ting!</Text>
      </View>
      <Form>
        <Item style={RegisterStyles.inputFields} floatingLabel>
          <Label>First Name</Label>
          <Input
            onChangeText={(firstName) => setFirstName(firstName)}
            onFocus={handleFocus}
            value={firstName}
          />
          {emailFieldError && <Icon name="alert-circle-outline"></Icon>}
        </Item>
        <Item style={RegisterStyles.inputFields} floatingLabel>
          <Label>Last Name</Label>
          <Input
            onChangeText={(lastName) => setLastName(lastName)}
            onFocus={handleFocus}
            value={lastName}
          />
          {emailFieldError && <Icon name="alert-circle-outline"></Icon>}
        </Item>
        <Item style={RegisterStyles.inputFields} floatingLabel>
          <Label>Username</Label>
          <Input
            onChangeText={(userName) => handleUserNameChange(userName)}
            onFocus={handleFocus}
            value={userName}
          />
          {emailFieldError && <Icon name="alert-circle-outline"></Icon>}
        </Item>
        <Item
          style={RegisterStyles.inputFields}
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
          {emailFieldError && <Icon name="alert-circle-outline"></Icon>}
        </Item>
        <Item style={RegisterStyles.inputFields} floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            onFocus={() => setError(false)}
          />
        </Item>
        {error && (
          <>
            <Text style={RegisterStyles.registerErrorText}>
              Incorrect Email or Password.
            </Text>
            <Text style={RegisterStyles.registerErrorText}>Try Again.</Text>
          </>
        )}
        {emptyStringError && (
          <>
            <Text style={RegisterStyles.registerErrorText}>
              Fields Cannot be Blank.
            </Text>
            <Text style={RegisterStyles.registerErrorText}>Try Again.</Text>
          </>
        )}
        <View>
          <Button
            onPress={() => handleRegister(email, password, userName)}
            style={RegisterStyles.registerButton}
          >
            <Center>
              <Text>Register</Text>
            </Center>
          </Button>
          <TouchableOpacity
            style={RegisterStyles.loginButton}
            onPress={() => navigate('Log in')}
          >
            <Text>Already a User? Sign In Here</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  );
};

const RegisterStyles = StyleSheet.create({
  inputFields: {
    width: 300,
  },
  registerButton: {
    marginTop: 30,
    alignSelf: 'center',
    width: 200,
  },
  loginButton: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerErrorText: { alignSelf: 'center', paddingTop: 10, color: 'red' },
});

export default Register;
