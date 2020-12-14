import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import Styles from './ViewDiscussion.styles';

export const ViewDiscussionFooter = ({
  keyboardHeight,
  keyboardIsShown,
  replyInput,
  setKeyboardText,
  setSendIsDisabled,
  sendIsDisabled,
  keyboardText,
}) => {
  return (
    <View
      style={{
        ...Styles.textInputContainer,
        bottom:
          Platform.OS === 'ios' && keyboardHeight && keyboardIsShown
            ? keyboardHeight
            : 8,
      }}
    >
      <TextInput
        value={keyboardText}
        style={Styles.textInputComponent}
        placeholder="Write a comment"
        ref={replyInput}
        multiline={true}
        onChangeText={(text) => {
          setKeyboardText(text);
          if (text === '') {
            setSendIsDisabled(true);
          } else if (text && sendIsDisabled) {
            setSendIsDisabled(false);
          }
        }}
      />
    </View>
  );
};
