import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import { View, ScrollView } from 'react-native';
import Loading from '../Loading';
import { Center } from '../Center';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmptyDataMessage from './components/EmptyDataMessage';
import DataDisplaySection from './components/DataDisplaySection';
import MyCalendarStyles from './MyCalendar.styles';
import { getMonthYearString, isObjectAndEmpty } from '../../utils';
import CalendarStripMemo from './components/CalendarStripMemo';

const MyCalendar = ({ navigation, route }) => {
  const today = new Date();
  const currentUser = auth().currentUser.uid;

  const [checkIns, setCheckIns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleDayData, setSingleDayData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  const findSingleDayData = (day, dataArray) => {
    const monthYearData = dataArray.find((element) => {
      return Object.keys(element)[0] === getMonthYearString(day);
    });
    if (monthYearData) {
      return Object?.values(monthYearData)?.[0]?.[day.getDate().toString()];
    }
    return null;
  };

  const getCheckIns = (userId, year) => {
    console.log('fired');
    setLoading(true);
    DB.ref(`/checkIns/${userId}/${year}/`).on('value', (querySnapshot) => {
      const data = querySnapshot.val();
      if (data && selectedDate) {
        let dataArray = [];
        for (var key in querySnapshot.val()) {
          dataArray.push({ [key]: querySnapshot.val()[key] });
        }
        setCheckIns(dataArray);
      } else {
        setCheckIns([]);
      }
    });
    setLoading(false);
  };

  const handleDateUpdate = (day) => {
    setSelectedDate(day);
    if (checkIns?.length) {
      setSingleDayData(findSingleDayData(day, checkIns));
    }
  };

  const handleCheckedInDatesStyle = (date) => {
    const newDate = new Date(date);
    if (selectedDateHasData(newDate)) {
      return {
        dateContainerStyle: { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
      };
    }
  };

  const selectedDateHasData = (date) => {
    if (checkIns?.length) {
      return checkIns.some((element) => {
        return (
          Object.keys(element)[0] === getMonthYearString(date) &&
          Object?.values(element).some((another) => {
            const dateEntryKeys = Object.keys(another);
            return (
              dateEntryKeys.includes(date.getDate().toString()) &&
              another[date.getDate()] !== null
            );
          })
        );
      });
    }
  };

  useEffect(() => {
    if (!checkIns) {
      getCheckIns(currentUser, today.getFullYear());
    }
    if (checkIns) {
      setSingleDayData(findSingleDayData(selectedDate, checkIns));
    }
  }, [checkIns]);

  const handleWeekChange = (start, end) => {
    // track fetched years in array, max length === 2
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startYear !== calendarYear) {
      getCheckIns(currentUser, startYear);
      setCalendarYear(startYear);
    }
  };

  return (
    <View style={MyCalendarStyles.container}>
      {selectedDate && !loading && (
        <CalendarStripMemo
          handleDateUpdate={handleDateUpdate}
          selectedDate={selectedDate}
          handleCheckedInDatesStyle={handleCheckedInDatesStyle}
          handleWeekChange={handleWeekChange}
        />
      )}
      <View style={MyCalendarStyles.dataViewContainer}>
        {loading && (
          <Center>
            <View>
              <Loading />
            </View>
          </Center>
        )}
        {!singleDayData && !loading && (
          <Center>
            <EmptyDataMessage
              handleClick={() => {
                navigation.push('Check In', {
                  date: selectedDate,
                });
              }}
            />
          </Center>
        )}
        {!loading && singleDayData && !isObjectAndEmpty(singleDayData) && (
          <ScrollView style={MyCalendarStyles.scrollViewContainer}>
            <DataDisplaySection
              data={[
                {
                  value: singleDayData.sliderValues.mood / 10,
                  heading: 'Mood',
                  highValueIsBad: false,
                },
                {
                  value: singleDayData.sliderValues.stressLevel / 10,
                  heading: 'Stress',
                  highValueIsBad: true,
                },
              ]}
              icon={<FontAwesome5 name="smile" size={50} />}
              title="Personal"
            />
            <DataDisplaySection
              data={[
                {
                  heading: 'Sound Intensity',
                  value: singleDayData.sliderValues.soundIntensity / 10,
                  highValueIsBad: true,
                },
                {
                  heading: 'Sound Pitch',
                  value: singleDayData.sliderValues.soundPitch / 10,
                  highValueIsBad: true,
                },
              ]}
              icon={<MaterialIcons name="hearing" size={50} />}
              title="Hearing"
            />
            <DataDisplaySection
              title="Sleep"
              data={[
                {
                  heading: 'Hours',
                  value: singleDayData.sliderValues.sleepHours / 10,
                  maxValue: 10,
                  highValueIsBad: false,
                },
              ]}
              icon={<FontAwesome5 name="bed" size={45} />}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default MyCalendar;
