import React, { useEffect, useState, useRef } from 'react';
import { View } from 'native-base';
import { TextInput, Keyboard, Platform } from 'react-native';
import { v4 as uuid } from 'uuid';
import auth from '@react-native-firebase/auth';
import { getUser } from '../../api/UserApi';

export const CreateDiscussion = ({ navigation }) => {
  const [user, setUser] = useState();
  const messageBodyRef = useRef(null);
  const currentUser = auth().currentUser.uid;
  const [message, setMessage] = useState({
    messageId: uuid(),
    userId: currentUser,
    messageHeader: null,
    messageBody: null,
    firstName: null,
    lastName: null,
  });

  useEffect(() => {
    if (!user) {
      getUser(currentUser, addUserInfoToMessage);
    }
  }, []);

  useEffect(() => {
    if (message.messageBody) {
      navigation.setParams({ message: message });
    }
  }, [message]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardWillHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => navigation.navigate('Discussions'),
      );
      return () => {
        keyboardWillHideListener.remove();
      };
    }
  }, []);

  const addUserInfoToMessage = (data) => {
    setUser(data);
    setMessage({
      ...message,
      firstName: data.firstName,
      lastName: data.lastName,
      replyCount: 0,
    });
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <TextInput
            autoFocus={true}
            placeholder="Enter your title "
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              alignSelf: 'stretch',
              textAlign: 'center',
            }}
            onChangeText={(text) =>
              setMessage({
                ...message,
                messageHeader: text,
              })
            }
            returnKeyType="next"
            onSubmitEditing={() => messageBodyRef.current.focus()}
            maxLength={32}
          />
        </View>
        <View style={{ marginTop: 60 }}>
          <TextInput
            ref={messageBodyRef}
            placeholder="Start a Discussion..."
            style={{ fontSize: 25 }}
            multiline={true}
            onChangeText={(text) =>
              setMessage({
                ...message,
                messageBody: text,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};
