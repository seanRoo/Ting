import React, { useContext, useEffect, useState } from 'react';
import { Text, Input, Icon, FormControl, Stack, Heading } from 'native-base';
import { View } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InputScrollView from 'react-native-input-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Login = ({ navigation }) => {
  const { navigate } = navigation;
  const { login, error: authError, setError } = useContext(AuthContext);
  const [email, setEmail] = useState({
    value: '',
    error: false,
    message: '',
  });
  const [password, setPassword] = useState({
    value: '',
    error: false,
    message: '',
    hideText: true,
  });
  const [emptyStringError, setEmptyStringError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const handleLogIn = () => {
    const newPassword = { ...password };
    const newEmail = { ...email };

    newPassword.error = newPassword.value.length < 6;
    newPassword.message = newPassword.error
      ? 'Password must be at least 6 characters'
      : '';

    newEmail.error = !newEmail.value?.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    );
    newEmail.message = newEmail.error ? 'Not a valid email' : '';

    setPassword(newPassword);
    setEmail(newEmail);

    if (newEmail?.value.length && newPassword?.value.length) {
      if (newEmail.error === false && newPassword.error === false) {
        login(newEmail.value, newPassword.value);
      }
    }
  };

  const handleFocus = () => {
    clearErrors();
  };

  useEffect(() => {
    navigation.addListener('blur', () => {
      clearErrors();
    });
  }, [navigation]);

  const clearErrors = () => {
    setEmail({ ...email, error: false, message: '' });
    setPassword({ ...password, error: false, message: '' });
    setError(false);
  };

  return (
    <InputScrollView
      alignItems="center"
      useAnimatedScrollView
      contentContainerStyle={{
        width: '80%',
      }}
    >
      <View
        style={{
          height: 200,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Heading size="2xl">Ting</Heading>
        <EvilIcons
          name="bell"
          size={55}
          color="orchid"
          style={{ paddingTop: 3, transform: [{ rotate: '30deg' }] }}
        />
      </View>
      <Stack direction="column" space={10}>
        <FormControl style={LoginStyles.inputFields} error={emailFieldError}>
          <Input
            _focus={{ borderColor: 'orchid' }}
            variant="rounded"
            placeholder="Email"
            onChangeText={(value) => setEmail({ ...email, value })}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            onFocus={handleFocus}
            value={email.value}
            borderColor="black"
            placeholderTextColor="black"
            size="lg"
          />
          {email.error && (
            <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
              {email.message}
            </Text>
          )}
        </FormControl>
        <FormControl style={LoginStyles.inputFields}>
          <Input
            _focus={{ borderColor: 'orchid' }}
            placeholder="Password"
            secureTextEntry={password.hideText}
            onChangeText={(value) => setPassword({ ...password, value })}
            onFocus={handleFocus}
            autoCapitalize="none"
            variant="rounded"
            placeholderTextColor="black"
            borderColor="black"
            size="lg"
            value={password.value}
            InputRightElement={
              <TouchableOpacity
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                onPress={() =>
                  setPassword({
                    ...password,
                    hideText: !password.hideText,
                  })
                }
              >
                <Icon
                  as={<MaterialIcons name="visibility-off" />}
                  size={5}
                  mr="2"
                  color="muted.600"
                />
              </TouchableOpacity>
            }
          />
          {password.error && (
            <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
              {password.message}
            </Text>
          )}
        </FormControl>
        {authError && (
          <>
            <Text style={LoginStyles.loginErrorText}>
              Incorrect Email or Password.
            </Text>
            <Text style={LoginStyles.loginErrorText}>Try Again.</Text>
          </>
        )}
        <View style={{ width: '97%', paddingBottom: 40 }}>
          <TouchableOpacity
            onPress={handleLogIn}
            style={LoginStyles.loginButton}
          >
            <Text
              style={{ alignSelf: 'center', color: 'white' }}
              uppercase={false}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={LoginStyles.registerButton}
            onPress={() => navigate('Register')}
          >
            <Text>New User? Register Here</Text>
          </TouchableOpacity>
        </View>
      </Stack>
    </InputScrollView>
  );
};

const LoginStyles = ScaledSheet.create({
  inputFields: {
    width: '100%',
    borderColor: 'black',
    height: 50,
  },
  loginButton: {
    borderWidth: 0.5,
    width: '100%',
    justifyContent: 'center',
    textTransform: 'none',
    backgroundColor: 'orchid',
    height: 50,
    borderRadius: 30,
  },
  registerButton: {
    alignSelf: 'center',
    paddingTop: '20@s',
  },
  header: {
    fontWeight: 'bold',
  },
  loginErrorText: { alignSelf: 'center', color: 'red' },
});

export default Login;
