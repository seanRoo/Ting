import React, { useEffect, useState, useRef } from 'react';
import { View, Keyboard, FlatList, ScrollView } from 'react-native';
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
import TextCustomFont from '../TextCustomFont';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ViewDiscussion = ({ route: { params }, navigation }) => {
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
    if (replies && repliesLoading) {
      setRepliesLoading(false);
    }
  }, [replies]);

  useEffect(() => {
    navigation.setParams({ disabled: sendIsDisabled });
  }, [sendIsDisabled, replies]);

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
      mainMessageRef.current = false;
      replyInput.current = false;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{
          marginBottom: replies?.length >= 1 ? 60 : 40,
          backgroundColor: 'whitesmoke',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <View style={{ margin: 12, flexDirection: 'row' }}>
              <Avatar
                size={40}
                titleStyle={{ fontSize: 22, color: 'white' }}
                rounded
                title={getInitials({
                  firstName: message.firstName,
                  lastName: message.lastName,
                })}
                activeOpacity={0.1}
                containerStyle={Styles.viewDiscussionAvatar}
              />
              <TextCustomFont
                style={{
                  fontSize: 16,
                  marginTop: 6,
                  marginLeft: 10,
                }}
              >
                {message.firstName} {message.lastName}
              </TextCustomFont>
            </View>
          </View>
          <TextCustomFont
            style={{
              margin: 12,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {message.messageHeader}
          </TextCustomFont>
          <TextCustomFont
            ref={mainMessageRef}
            style={{
              fontSize: 18,
              margin: normalize(12),
              marginRight: 8,
              marginTop: 0,
            }}
          >
            {message.messageBody}
          </TextCustomFont>
          <TextCustomFont
            style={{
              marginLeft: 14,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            {formatFooterDate(message.date)}
          </TextCustomFont>
          <Divider color="gray" style={{ paddingTop: 10 }} />
          <Divider color="gray" style={{ paddingTop: 10 }} />
        </View>
        <View style={{ minHeight: 'auto' }}>
          {replies && !repliesLoading && (
            <FlatList
              contentContainerStyle={{
                width: '94%',
                alignSelf: 'flex-end',
                marginRight: 2,
                marginTop: 8,
              }}
              data={replies}
              keyExtractor={(reply) => reply.messageId}
              renderItem={(reply, index) => (
                <ReplyMessage
                  initials={getInitials({
                    firstName: reply.item.firstName,
                    lastName: reply.item.lastName,
                  })}
                  message={reply}
                  index={index}
                  ForceLoseFocus={ForceLoseFocus}
                  isAuthor={reply.userId === currentUser}
                />
              )}
            />
          )}
          {repliesLoading && (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Loading />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
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
  );
};

export default ViewDiscussion;
