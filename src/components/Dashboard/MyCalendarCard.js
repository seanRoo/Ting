import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { DateTime } from 'luxon';

const MyCalendarCard = ({ handleClick, checkedIn }) => {
  return (
    <View style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
      <TouchableOpacity
        onPress={handleClick}
        style={{
          margin: 2,
          flex: 0.98,
          borderRadius: 10,
          padding: 8,
          paddingBottom: 0,
          borderWidth: 1,
          borderColor: 'orchid',
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 8,
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
            size={24}
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
