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
import auth from '@react-native-firebase/auth';

// const __doSignUp = () => {
//     if (!email) {
//       setError("Email required *")
//       setValid(false)
//       return
//     } else if (!password && password.trim() && password.length > 6) {
//       setError("Weak password, minimum 5 chars")
//       setValid(false)
//       return
//     } else if (!__isValidEmail(email)) {
//       setError("Invalid Email")
//       setValid(false)
//       return
//     }

//     __doCreateUser(email, password)
//   }

const __doCreateUser = async (userName, password) => {
  try {
    let response = await auth().createUserWithEmailAndPassword(
      userName,
      password,
    );
    if (response) {
      console.log(response);
    }
  } catch (e) {
    console.error(e.message);
  }
};

const Login = ({navigation: {navigate}}) => {
  const {login} = useContext(AuthContext);
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <Header />
      <Content>
        <Center>
          <View>
            <Text style={LoginStyles.header}>Ting!</Text>
          </View>
        </Center>
        <Form>
          <Center>
            <Item style={LoginStyles.inputFields} floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(userName) => setUsername(userName)} />
            </Item>
            <Item style={LoginStyles.inputFields} floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </Item>
            <View>
              <Button
                onPress={() => __doCreateUser(userName, password)}
                style={LoginStyles.loginButton}>
                <Text>Log In</Text>
              </Button>
            </View>
          </Center>
        </Form>
      </Content>
    </Container>
  );
};

const LoginStyles = StyleSheet.create({
  inputFields: {
    width: 300,
  },
  loginButton: {
    marginTop: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
  },
});

export default Login;
