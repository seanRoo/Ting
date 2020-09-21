import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import auth from '@react-native-firebase/auth';
import {DB} from '../../config';
import {isEmpty} from 'lodash';
import {Text, View} from 'react-native';
import Loading from '../Loading';
import {Center} from '../Center';

const handleMarkedDates = (data = {}) => {
  let markedDates = [];
  Object.keys(data).map((key) => {
    markedDates[key] = {
      customStyles: {
        container: {
          backgroundColor: 'green',
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      },
    };
  });
  return markedDates;
};

const MyCalendar = ({navigation}) => {
  const currentUser = auth().currentUser.uid;
  const [markedDates, setMarkedDates] = useState();
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [checkIns, setCheckIns] = useState();
  const [monthYearString, setMonthYearString] = useState();
  const [loading, setLoading] = useState(true);

  const getCheckIns = (userId, monthYearValue) => {
    try {
      DB.ref(`/checkIns/${userId}/${monthYearValue}`).on(
        'value',
        (querySnapshot) => {
          let data = querySnapshot.val() ? querySnapshot.val() : {};
          setCheckIns(data);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthUpdate = (date) => {
    const updatedDate = new Date(date);
    setCurrentCalendarDate(updatedDate);
    setMonthYearString(
      `${updatedDate.getFullYear()}-${updatedDate.getMonth() + 1}`,
    );
    getCheckIns(currentUser, monthYearString);
  };

  useEffect(() => {
    if (!monthYearString) {
      setMonthYearString(
        `${currentCalendarDate.getFullYear()}-${
          currentCalendarDate.getMonth() + 1
        }`,
      );
    }
    if (!checkIns && monthYearString) {
      getCheckIns(currentUser, monthYearString);
    }
    if (!markedDates && checkIns) {
      setMarkedDates(handleMarkedDates(checkIns));
    }
    if (!isEmpty(checkIns) && markedDates) {
      setLoading(false);
    }
  }, [markedDates, currentCalendarDate, monthYearString, checkIns]);
  return (
    <View>
      {checkIns && markedDates && (
        <Calendar
          onDayPress={(day) =>
            navigation.navigate('Check In', {
              date: day,
              monthYearString,
            })
          }
          hideArrows={false}
          hideExtraDays={true}
          markedDates={markedDates}
          markingType={'custom'}
          current={currentCalendarDate}
          onMonthChange={(date) => handleMonthUpdate(date.dateString)}
        />
      )}
      {loading && (
        <Center>
          <View>
            <Loading />
          </View>
        </Center>
      )}
    </View>
  );
};

export default MyCalendar;
