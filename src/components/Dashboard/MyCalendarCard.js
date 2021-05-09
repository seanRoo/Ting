import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { DateTime } from 'luxon';

const MyCalendarCard = ({ handleClick, checkedIn }) => {
  return (
    <View style={{ flex: 0.5, flexDirection: 'column' }}>
      <TouchableOpacity
        onPress={handleClick}
        style={{
          flex: 0.98,
          borderRadius: 10,
          padding: 8,
          paddingBottom: 0,
          borderWidth: 1,
          marginBottom: 8,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
          }}
        >
          <Text style={{ fontSize: 18, color: 'orchid', fontWeight: 'bold' }}>
            My Calendar
          </Text>
          <MaterialCommunityIcons
            style={{
              position: 'absolute',
              right: 0,
            }}
            size={20}
            name="calendar-multiple-check"
            color="orchid"
          />
        </View>
        <View style={{ flex: 0.1 }} />
        <View
          style={{
            flex: 0.7,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingRight: 6,
            paddingLeft: 6,
          }}
        >
          <Text
            style={{
              padding: 8,
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
          </Text>
          {!checkedIn && (
            <>
              <Text style={{ textAlign: 'center', color: 'black' }}>
                You haven't checked in today
              </Text>
            </>
          )}
          {checkedIn && (
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 20,
                }}
              >
                Checked In
              </Text>
              <IonIcons
                name="md-checkbox"
                size={22}
                color="green"
                style={{
                  backgroundColor: 'white',
                  marginLeft: 8,
                  marginTop: 2,
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyCalendarCard;
