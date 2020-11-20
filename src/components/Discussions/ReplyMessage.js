import React from 'react';
import { Left } from 'native-base';
import { Text, View } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import Styles from './ViewDiscussion.styles';

export const ReplyMessage = ({ message, initials }) => {
  return (
    <>
      <Divider style={{ marginTop: 5 }} />
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <View style={{ width: '12%', flexDirection: 'column' }}>
          <Left style={{ marginLeft: 12, marginTop: 4 }}>
            <Avatar
              size="small"
              rounded
              title={initials}
              activeOpacity={0.1}
              containerStyle={Styles.avatar}
            />
          </Left>
        </View>
        <View style={Styles.replyTextContainer}>
          <Text style={Styles.replyMessageHeading}>
            {message.firstName} {message.lastName}
          </Text>
          <Text style={Styles.replyMessageBody}>{message.messageBody}</Text>
        </View>
      </View>
      <Divider style={{ marginBottom: 5 }} />
    </>
  );
};
