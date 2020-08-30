import React, {useContext, useState} from 'react';
import {
  Container,
  Text,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../AuthProvider';
import {Center} from './Center';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Register = ({navigation: {navigate}}) => {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={RegisterStyles.container}>
      <View>
        <Text style={RegisterStyles.header}>Ting!</Text>
      </View>
      <Form>
        <Item style={RegisterStyles.inputFields} floatingLabel>
          <Label>Email</Label>
          <Input
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
        </Item>
        <Item style={RegisterStyles.inputFields} floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </Item>
        <View>
          <Button
            onPress={() => register(email, password)}
            style={RegisterStyles.registerButton}>
            <Center>
              <Text style={RegisterStyles.buttonText}>Register</Text>
            </Center>
          </Button>
          <TouchableOpacity
            style={RegisterStyles.loginButton}
            onPress={() => navigate('Log in')}>
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
});

export default Register;
