import React from 'react';
import { Card, CardItem, Body, Icon } from 'native-base';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Styles from './Discussions.styles';
import { Avatar } from 'react-native-elements';
import { formatFooterDate } from './Discussions.utils';
import { DateTime } from 'luxon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const DiscussionCard = ({ message, handleNavigation, isAuthor }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleNavigation(message)}>
      <Card style={Styles.discussionCard}>
        <View
          style={{ borderColor: 'orchid', borderWidth: 1, borderRadius: 20 }}
        >
          <View style={{ flexDirection: 'row', margin: 14, marginBottom: 5 }}>
            <Avatar
              size={30}
              rounded
              title="SR"
              activeOpacity={0.1}
              containerStyle={{ backgroundColor: 'black' }}
            />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={
                    ({ fontSize: 12 }, isAuthor && { ...Styles.authorStyle })
                  }
                >
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
              <Text style={{ fontSize: 12 }}>
                {DateTime.fromJSDate(new Date(message.date)).toRelative()}
              </Text>
            </View>
          </View>
          <CardItem header style={{ marginTop: 8, paddingBottom: 0 }}>
            <Text style={Styles.heading}>{message.messageHeader}</Text>
          </CardItem>
          <CardItem style={{ marginTop: 8 }}>
            <Body>
              <Text style={Styles.bodyText} numberOfLines={3}>
                {message.messageBody}
              </Text>
            </Body>
          </CardItem>

          <CardItem bordered footer style={Styles.footer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginRight: 14,
                height: 'auto',
              }}
            >
              <Icon
                name="chatbox-sharp"
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 2,
                }}
              />
              <Text style={{ fontSize: 16 }}>
                {message.replyCount} Comments
              </Text>
            </View>
            {/* <View style={{ flexDirection: 'row', marginRight: 14 }}>
            <Icon
              name="md-arrow-up"
              style={{
                fontSize: 20,
                textAlign: 'center',
              }}
            />
            <Text>20</Text>
          </View> */}
          </CardItem>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};
