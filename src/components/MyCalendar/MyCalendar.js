import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';

const testDates = [
  {
    checkedIn: false,
    date: '2020-09-20',
  },
  {
    checkedIn: true,
    date: '2020-09-21',
  },
  {
    checkedIn: true,
    date: '2020-09-22',
  },
];
const handleMarkedDates = () => {
  let markedDates = [];
  markedDates = testDates.reduce((acc, {date, checkedIn}) => {
    if (checkedIn) {
      acc[date] = {
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
    } else {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: 'red',
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      };
    }
    return acc;
  }, {});
  return markedDates;
};

const MyCalendar = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState();
  useEffect(() => {
    if (!markedDates) {
      setMarkedDates(handleMarkedDates());
    }
  }, [markedDates]);
  return (
    <Calendar
      onDayPress={(day) =>
        navigation.navigate('Check In', {
          date: day,
        })
      }
      hideArrows={false}
      hideExtraDays={true}
      markedDates={markedDates}
      markingType={'custom'}
    />
  );
};

export default MyCalendar;
