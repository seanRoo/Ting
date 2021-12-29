import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Styles from './Discussions.styles';
import { Avatar, Divider } from 'react-native-elements';
import { DateTime } from 'luxon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';

export const DiscussionCard = ({ message, handleNavigation, isAuthor }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleNavigation(message)}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'orchid',
          marginBottom: 10,
          borderRadius: 20,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 8,
        }}
      >
        <View style={{ padding: 10 }}>
          <View id="authorInfo" style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Avatar
                size={28}
                rounded
                title="SR"
                activeOpacity={0.1}
                containerStyle={{ backgroundColor: 'black' }}
              />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: isAuthor ? 'dodgerblue' : 'black',
                    }}
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
          </View>
          <View id="header" style={{ marginBottom: 10 }}>
            <Text style={Styles.heading}>{message.messageHeader}</Text>
          </View>
          <View id="content">
            <Text style={Styles.bodyText} numberOfLines={4}>
              {message.messageBody}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ borderBottomEndRadius: 20 }}>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              padding: 8,
              paddingRight: 16,
            }}
          >
            <IonIcons
              name="chatbox-ellipses-outline"
              size={22}
              style={{
                textAlign: 'center',
                marginRight: 6,
              }}
            />
            <Text style={{ fontSize: 14 }}>{message.replyCount} Comments</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
