import React, { useEffect, useState, useRef } from 'react';
import { Left, List } from 'native-base';
import {
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Styles from './ViewDiscussion.styles';
import { ReplyMessage } from './ReplyMessage';
import { normalize } from './Discussion.utils';
import { ViewDiscussionFooter } from './ViewDiscussionFooter';
import { NavigationContainer } from '@react-navigation/native';

export const ViewDiscussion = ({ route: { params }, navigation }) => {
  const scrollRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const [keyboardText, setKeyboardText] = useState(null);
  const [sendIsDisabled, setSendIsDisabled] = useState(true);
  const replyInput = useRef(null);
  const mainMessageRef = useRef(null);
  const message = params.element;
  const initials = `${message.firstName.charAt(0)}${message.lastName.charAt(
    0,
  )}`;
  const handleScrollGrow = () => {
    if (keyboardIsShown && Platform.OS === 'ios') {
      return 0.5;
    } else if (keyboardIsShown && Platform.OS === 'android') {
      return 0.75;
    }
    return 0.88;
  };
  const ForceLoseFocus = () => {
    setKeyboardIsShown(false);
    replyInput?.current?.blur();
    setKeyboardHeight(0);
  };

  useEffect(() => {
    console.log(sendIsDisabled);
    navigation.setParams({ disabled: sendIsDisabled });
  }, [sendIsDisabled]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      ForceLoseFocus,
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setKeyboardIsShown(false),
    );

    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardIsShown(true);
      },
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardIsShown(true);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardWillShowListener.remove();
      keyboardDidShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [setKeyboardIsShown, keyboardIsShown]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{ height: '100%' }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          enabled
          ref={scrollRef}
          style={{
            flexGrow: handleScrollGrow(),
          }}
        >
          <View onPress={() => ForceLoseFocus()}>
            <View
              style={{ width: '100%', flexDirection: 'row', height: 'auto' }}
            >
              <Left style={{ margin: normalize(14), flexDirection: 'row' }}>
                <Avatar
                  size="medium"
                  titleStyle={{ fontSize: normalize(16) }}
                  rounded
                  title={initials}
                  activeOpacity={0.1}
                  containerStyle={Styles.avatar}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 12,
                    marginLeft: normalize(10),
                  }}
                >
                  {message.firstName} {message.lastName}
                </Text>
              </Left>
            </View>
            <Text
              ref={mainMessageRef}
              style={{
                fontSize: 18,
                margin: normalize(12),
                marginTop: 0,
              }}
            >
              {message.messageBody}
            </Text>
            <Divider style={{ marginBottom: 30 }} />
            <Divider style={{ marginBottom: 15 }} />
            <List>
              <ReplyMessage initials={initials} message={message} />
              <ReplyMessage initials={initials} message={message} />
            </List>
          </View>
        </ScrollView>
        <ViewDiscussionFooter
          keyboardHeight={keyboardHeight}
          keyboardIsShown={keyboardIsShown}
          replyInput={replyInput}
          setKeyboardText={setKeyboardText}
          setSendIsDisabled={setSendIsDisabled}
          sendIsDisabled={sendIsDisabled}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
