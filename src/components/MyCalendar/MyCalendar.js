import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import { View } from 'react-native';
import Loading from '../Loading';
import { Center } from '../Center';

const MyCalendar = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const [markedDates, setMarkedDates] = useState();
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [checkIns, setCheckIns] = useState();
  const [monthYearString, setMonthYearString] = useState();
  const [loading, setLoading] = useState(true);

  const handleMarkedDates = (data = {}) => {
    let newMarkedDates = [];
    Object.keys(data).map((key) => {
      newMarkedDates[key] = {
        customStyles: {
          container: {
            backgroundColor: '#C3FDB8',
          },
          text: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
      };
    });
    setMarkedDates(newMarkedDates);
    setLoading(false);
  };

  const getCheckIns = (userId, monthYearValue) => {
    try {
      DB.ref(`/checkIns/${userId}/${monthYearValue}`).on(
        'value',
        (querySnapshot) => {
          let data = querySnapshot.val() ? querySnapshot.val() : {};
          setCheckIns(data);
          handleMarkedDates(data);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthUpdate = (date) => {
    setLoading(true);
    const updatedDate = new Date(date);
    const newMonthYearString = `${updatedDate.getFullYear()}-${
      updatedDate.getMonth() + 1
    }`;
    setCurrentCalendarDate(updatedDate);
    setMonthYearString(newMonthYearString);
    getCheckIns(currentUser, newMonthYearString);
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
  }, [markedDates, currentCalendarDate, monthYearString, checkIns]);
  return (
    <>
      {checkIns && markedDates && !loading && (
        <View>
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
        </View>
      )}
      {loading && (
        <Center>
          <View>
            <Loading />
          </View>
        </Center>
      )}
    </>
  );
};

export default MyCalendar;
