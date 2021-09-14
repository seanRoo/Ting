import React from 'react';
import { Left, ListItem, Body } from 'native-base';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import Styles from './ViewDiscussion.styles';
import { DateTime } from 'luxon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ReplyMessage = ({
  message,
  initials,
  index,
  ForceLoseFocus,
  isAuthor,
}) => {
  let relativeDate = DateTime.fromJSDate(new Date(message.date)).toRelative();
  relativeDate = relativeDate === 'in 0 seconds' ? 'Just now' : relativeDate;
  return (
    <TouchableWithoutFeedback onPress={() => ForceLoseFocus()}>
      <ListItem
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
          borderRadius: 10,
          marginTop: index === 0 ? 10 : 0,
          borderColor: 'orchid',
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 8,
        }}
        avatar
        noBorder
      >
        <Left style={{ marginLeft: 6 }}>
          <Avatar
            size={20}
            rounded
            title={initials}
            activeOpacity={0.1}
            containerStyle={Styles.avatar}
          />
        </Left>
        <Body style={{ marginLeft: 12 }}>
          <View style={{ flexDirection: 'row', flex: 1, marginBottom: 10 }}>
            <View
              style={{
                alignSelf: 'flex-start',
                flex: 0.95,
                marginTop: 1,
                flexDirection: 'row',
              }}
            >
              <Text style={isAuthor && { color: 'dodgerblue' }}>
                {message.firstName} {message.lastName}
              </Text>
              {isAuthor && (
                <FontAwesome5
                  style={{
                    marginLeft: 8,
                    marginTop: 3,
                    alignSelf: 'flex-start',
                    color: 'dodgerblue',
                  }}
                  name="feather"
                />
              )}
            </View>
            <Text style={{ alignSelf: 'flex-end' }}>{relativeDate}</Text>
          </View>
          <Text style={Styles.replyMessageBody}>{message.messageBody}</Text>
        </Body>
      </ListItem>
    </TouchableWithoutFeedback>
  );
};
