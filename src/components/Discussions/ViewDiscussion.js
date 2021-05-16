import React, { useEffect, useState, useRef } from 'react';
import { Left, List, Button } from 'native-base';
import {
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import Styles from './ViewDiscussion.styles';
import { ReplyMessage } from './ReplyMessage';
import { normalize } from './Discussion.utils';
import { ViewDiscussionFooter } from './ViewDiscussionFooter';
import { getReplies } from '.././../api/DiscussionsApi';
import { getUser } from '.././../api/UserApi';
import auth from '@react-native-firebase/auth';
import { getInitials, formatFooterDate } from './Discussions.utils';
import { v4 as uuid } from 'uuid';
import Loading from '../Loading';
import { Center } from '../Center';

export const ViewDiscussion = ({ route: { params }, navigation }) => {
  const windowHeight = Dimensions.get('window').height;
  const currentUser = auth().currentUser.uid;
  const { message } = params;

  const [user, setUser] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const [keyboardText, setKeyboardText] = useState(null);
  const [sendIsDisabled, setSendIsDisabled] = useState(true);
  const [replies, setReplies] = useState(null);
  const [repliesLoading, setRepliesLoading] = useState(true);

  const replyInput = useRef(null);
  const mainMessageRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScrollGrow = () => {
    if (keyboardIsShown && Platform.OS === 'ios' && windowHeight < 800) {
      return 0.48;
    } else if (keyboardIsShown && Platform.OS === 'android') {
      return 0.8;
    } else if (keyboardIsShown && Platform.OS === 'ios' && windowHeight > 800) {
      return 0.47;
    }
    return 0.9;
  };
  const ForceLoseFocus = () => {
    setKeyboardIsShown(false);
    replyInput?.current?.blur();
    setKeyboardHeight(0);
  };

  useEffect(() => {
    if (!user) {
      getUser(currentUser, setUser);
    }
    if (!replies && message) {
      getReplies(message.messageId, setReplies);
    }
  }, []);

  useEffect(() => {
    navigation.setParams({ disabled: sendIsDisabled });
  }, [sendIsDisabled]);

  useEffect(() => {
    if (user) {
      navigation.setParams({
        replyMessage: {
          parentMessageId: message.messageId,
          messageBody: keyboardText,
          userId: currentUser,
          firstName: user.firstName,
          lastName: user.lastName,
          messageId: uuid(),
        },
        setKeyboardText,
      });
    }
  }, [keyboardText, user]);

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

  useEffect(() => {
    return () => {
      scrollRef.current = false;
      mainMessageRef.current = false;
      replyInput.current = false;
    };
  }, []);

  return (
    <>
      {user && message && (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'whitesmoke' }}
        >
          <View style={{ height: '100%' }}>
            <ScrollView
              onPress={() => ForceLoseFocus()}
              keyboardShouldPersistTaps="handled"
              enabled
              ref={scrollRef}
              style={{
                flexGrow: handleScrollGrow(),
                marginBottom: 0,
              }}
            >
              <View style={{ backgroundColor: 'white' }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}
                >
                  <Left style={{ margin: normalize(12), flexDirection: 'row' }}>
                    <Avatar
                      size={30}
                      titleStyle={{ fontSize: normalize(16) }}
                      rounded
                      title={getInitials({
                        firstName: message.firstName,
                        lastName: message.lastName,
                      })}
                      activeOpacity={0.1}
                      containerStyle={Styles.avatar}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        marginTop: 6,
                        marginLeft: normalize(10),
                      }}
                    >
                      {message.firstName} {message.lastName}
                    </Text>
                  </Left>
                </View>
                <Text
                  style={{
                    margin: normalize(12),
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {message.messageHeader}
                </Text>
                <Text
                  ref={mainMessageRef}
                  style={{
                    fontSize: 18,
                    margin: normalize(12),
                    marginRight: 8,
                    marginTop: 0,
                  }}
                >
                  {message.messageBody}
                </Text>
                <Text style={{ marginLeft: normalize(12) }}>
                  {formatFooterDate(message.date)}
                </Text>
                <Divider style={{ marginTop: 10 }} />
                <Divider style={{ marginTop: 10 }} />
              </View>
              <View>
                {replies && (
                  <List
                    style={{ backgroundColor: 'whitesmoke' }}
                    onPress={() => ForceLoseFocus()}
                  >
                    {replies.map((reply, index) => (
                      <ReplyMessage
                        initials={getInitials({
                          firstName: reply.firstName,
                          lastName: reply.lastName,
                        })}
                        message={reply}
                        index={index}
                        ForceLoseFocus={ForceLoseFocus}
                        isAuthor={reply.userId === currentUser}
                      />
                    ))}
                  </List>
                )}
                {/* {repliesLoading && (
                  <Center>
                    <Loading />
                  </Center>
                )} */}
              </View>
            </ScrollView>
            <ViewDiscussionFooter
              keyboardHeight={keyboardHeight}
              keyboardIsShown={keyboardIsShown}
              replyInput={replyInput}
              setKeyboardText={setKeyboardText}
              setSendIsDisabled={setSendIsDisabled}
              sendIsDisabled={sendIsDisabled}
              keyboardText={keyboardText}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
