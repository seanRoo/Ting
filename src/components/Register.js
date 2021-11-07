import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Text,
  Input,
  Icon,
  FormControl,
  Heading,
  Stack,
  View,
} from 'native-base';
import { AuthContext } from '../AuthProvider';
import { Center } from './Center';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InputScrollView from 'react-native-input-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Register = ({ navigation: { navigate } }) => {
  const inputRef = useRef(null);
  const { register } = useContext(AuthContext);
  const [fieldValues, setFieldValues] = useState({
    firstName: {
      stringValue: '',
      error: false,
    },
    surName: {
      stringValue: '',
      error: false,
    },
    email: {
      stringValue: '',
      error: false,
    },
    password: {
      stringValue: '',
      error: false,
      hideText: true,
    },
    confirmPassword: {
      stringValue: '',
      error: false,
      hideText: true,
    },
  });

  const checkValidRegistration = (values) => {
    const allFieldsValid = Object.entries(values).every(
      ([key, value]) => value.error === false,
    );

    return allFieldsValid;
  };

  const handleRegister = () => {
    inputRef?.current?.blur();
    let newFieldValues = { ...fieldValues };
    for (const [key, value] of Object.entries(newFieldValues)) {
      newFieldValues[key].error = checkFieldIsInvalid(key, value.stringValue);
      if (newFieldValues[key].error) {
        if (key === 'email') {
          newFieldValues[key].message = 'Not a valid email';
        }
        if (
          (key === 'password' || key === 'confirmPassword') &&
          newFieldValues[key].stringValue.length < 6
        ) {
          newFieldValues[key].message =
            'Password must be at least 6 characters';
        }
        if (
          (key === 'password' || key === 'confirmPassword') &&
          newFieldValues.password.stringValue !==
            newFieldValues.confirmPassword.stringValue &&
          newFieldValues.password.stringValue.length >= 6 &&
          newFieldValues.confirmPassword.stringValue.length >= 6
        ) {
          newFieldValues.password.message = 'Passwords do not match';
          newFieldValues.confirmPassword.message = 'Passwords do not match';
        }
      } else {
        newFieldValues[key].error = false;
      }
    }

    const validRegistration = checkValidRegistration(newFieldValues);

    if (validRegistration) {
      const { email, password, firstName, surName } = fieldValues;
      register({
        email: email.stringValue,
        password: password.stringValue,
        firstName: firstName.stringValue,
        surName: surName.stringValue,
      }).then(() => navigate('Log in'));
    }
    console.log(newFieldValues);
    setFieldValues(newFieldValues);
  };

  const handleFocus = (key) => {
    if (key === 'password' || key === 'confirmPassword') {
      setFieldValues({
        ...fieldValues,
        password: { ...fieldValues.password, error: false, message: '' },
        confirmPassword: {
          ...fieldValues.confirmPassword,
          error: false,
          message: '',
        },
      });
    } else {
      setFieldValues({
        ...fieldValues,
        [key]: { ...fieldValues[key], error: false, message: '' },
      });
    }
  };

  const checkFieldIsInvalid = (field, value) => {
    let fieldIsInvalid = true;
    if (!value?.length) {
      return fieldIsInvalid;
    }
    switch (field) {
      case 'email':
        fieldIsInvalid = !value.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        );
        break;
      case 'password':
        fieldIsInvalid = !value.length >= 6;
        break;
      case 'confirmPassword':
        fieldIsInvalid = !(
          value.length >= 6 && value === fieldValues.password.stringValue
        );
        break;
      // default:
      //   fieldIsInvalid = false;
    }
    return fieldIsInvalid;
  };

  const handleFieldChange = (field, value) => {
    let newFieldValues = { ...fieldValues };
    newFieldValues = {
      ...newFieldValues,
      [field]: {
        ...fieldValues[field],
        stringValue: value,
      },
    };
    setFieldValues(newFieldValues);
  };

  return (
    <InputScrollView
      alignFormControls="center"
      useAnimatedScrollView
      keyboardOffset={180}
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
      <Stack direction="column" space={10} style={{ alignItems: 'center' }}>
        <Stack
          direction="row"
          space={0.2}
          style={{
            width: '94%',
            alignItems: 'center',
          }}
        >
          <FormControl style={RegisterStyles.inputFields}>
            <Input
              ref={inputRef}
              _focus={{ borderColor: 'orchid' }}
              variant="rounded"
              placeholder="First Name *"
              onChangeText={(firstName) =>
                handleFieldChange('firstName', firstName)
              }
              onFocus={() => handleFocus('firstName')}
              value={fieldValues.firstName.stringValue}
              placeholderTextColor="black"
              size="lg"
              borderColor="black"
              isInvalid={fieldValues.firstName.error}
            />
            {fieldValues.firstName.error && (
              <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
                First name cannot be empty
              </Text>
            )}
          </FormControl>
          <FormControl style={RegisterStyles.inputFields}>
            <Input
              ref={inputRef}
              _focus={{ borderColor: 'orchid' }}
              variant="rounded"
              placeholder="Surname *"
              onChangeText={(surName) => handleFieldChange('surName', surName)}
              onFocus={() => handleFocus('surName')}
              value={fieldValues.surName.stringValue}
              placeholderTextColor="black"
              size="lg"
              borderColor="black"
              isInvalid={fieldValues.surName.error}
            />
            {fieldValues.surName.error && (
              <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
                Surname cannot be empty
              </Text>
            )}
          </FormControl>
        </Stack>
        <FormControl style={RegisterStyles.fullWidthInputField}>
          <Input
            ref={inputRef}
            _focus={{ borderColor: 'orchid' }}
            variant="rounded"
            placeholder="Email *"
            onChangeText={(email) => handleFieldChange('email', email)}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            onFocus={() => handleFocus('email')}
            value={fieldValues.email.stringValue}
            placeholderTextColor="black"
            borderColor="black"
            size="lg"
            isInvalid={fieldValues.email.error}
          />
          {fieldValues.email.error && (
            <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
              {fieldValues.email.message}
            </Text>
          )}
        </FormControl>
        <FormControl style={RegisterStyles.fullWidthInputField}>
          <Input
            ref={inputRef}
            _focus={{ borderColor: 'orchid' }}
            variant="rounded"
            placeholder="Password *"
            onChangeText={(password) => handleFieldChange('password', password)}
            onFocus={() => handleFocus('password')}
            // onBlur={handlePasswordBlur}
            borderColor="black"
            placeholderTextColor="black"
            size="lg"
            isInvalid={fieldValues.password.error}
            secureTextEntry={fieldValues.password.hideText}
            InputRightElement={
              <TouchableOpacity
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                onPress={() =>
                  setFieldValues({
                    ...fieldValues,
                    password: {
                      ...fieldValues.password,
                      hideText: !fieldValues.password.hideText,
                    },
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
          {fieldValues.password.error && (
            <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
              {fieldValues.password.message}
            </Text>
          )}
        </FormControl>
        <FormControl style={RegisterStyles.fullWidthInputField}>
          <Input
            ref={inputRef}
            _focus={{ borderColor: 'orchid' }}
            variant="rounded"
            placeholder="Confirm Password *"
            secureTextEntry={fieldValues.confirmPassword.hideText}
            onChangeText={(confirmPassword) =>
              handleFieldChange('confirmPassword', confirmPassword)
            }
            onFocus={() => handleFocus('confirmPassword')}
            borderColor="black"
            placeholderTextColor="black"
            size="lg"
            isInvalid={fieldValues.confirmPassword.error}
            InputRightElement={
              <TouchableOpacity
                onPress={() =>
                  setFieldValues({
                    ...fieldValues,
                    confirmPassword: {
                      ...fieldValues.confirmPassword,
                      hideText: !fieldValues.confirmPassword.hideText,
                    },
                  })
                }
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
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
          {fieldValues.confirmPassword.error && (
            <Text style={{ color: 'red', marginTop: 4, marginLeft: 4 }}>
              {fieldValues.confirmPassword.message}
            </Text>
          )}
        </FormControl>
        <View style={{ width: '97%', paddingBottom: 30 }}>
          <TouchableOpacity
            onPress={() => {
              const { email, password } = fieldValues;
              handleRegister(email, password);
            }}
            style={RegisterStyles.registerButton}
          >
            <Center>
              <Text color="white">Register</Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={RegisterStyles.loginButton}
            onPress={() => navigate('Log in')}
          >
            <Text>Already a User? Sign In Here</Text>
          </TouchableOpacity>
        </View>
      </Stack>
    </InputScrollView>
  );
};

const RegisterStyles = ScaledSheet.create({
  inputFields: {
    width: '50%',
    borderColor: 'black',
    paddingLeft: 10,
    height: 45,
    //marginLeft: 5,
  },
  fullWidthInputField: {
    width: '94%',
    borderColor: 'black',
    paddingLeft: 10,
    height: 45,
  },
  registerButton: {
    borderWidth: 0.5,
    width: '94%',
    marginLeft: 10,
    justifyContent: 'center',
    textTransform: 'none',
    backgroundColor: 'orchid',
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
  },
  loginButton: {
    alignSelf: 'center',
    paddingTop: '20@s',
  },
  header: {
    fontSize: '30@s',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    //alignFormControls: 'center',
  },
  registerErrorText: { alignSelf: 'center', paddingTop: '10@s', color: 'red' },
});

export default Register;
