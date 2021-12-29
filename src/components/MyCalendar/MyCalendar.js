import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import { View, ScrollView, SnapshotViewIOSBase } from 'react-native';
import Loading from '../Loading';
import { Center } from '../Center';
import CalendarStrip from 'react-native-calendar-strip';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import EmptyDataMessage from './components/EmptyDataMessage';
import DataDisplaySection from './components/DataDisplaySection';
import MyCalendarStyles from './MyCalendar.styles';
import {
  getMonthYearDayString,
  getMonthYearString,
  isObjectAndEmpty,
} from '../../utils';

const MyCalendar = ({ navigation, route }) => {
  const today = new Date();
  const currentUser = auth().currentUser.uid;

  const [checkIns, setCheckIns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleDayData, setSingleDayData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);

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
    setLoading(true);
    DB.ref(`/checkIns/${userId}/${year}`).on('value', (querySnapshot) => {
      const data = querySnapshot.val();
      if (data && selectedDate) {
        let dataArray = [];
        for (var key in querySnapshot.val()) {
          dataArray.push({ [key]: querySnapshot.val()[key] });
        }
        setCheckIns(dataArray);
        setSingleDayData(findSingleDayData(selectedDate, dataArray));
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
          Object?.values(element).some((another) =>
            Object.keys(another).includes(date.getDate().toString()),
          )
        );
      });
    }
  };

  useEffect(() => {
    if (!checkIns) {
      getCheckIns(currentUser, today.getFullYear());
    }
    //handleDateUpdate(new Date());
  }, []);

  const handleNewCheckIn = (newValue, monthYearString, date) => {
    console.log(newValue, monthYearString, date);
    const newCheckIns = [...checkIns];
    const index = checkIns.findIndex(
      (element) => Object.keys(element)[0] === monthYearString,
    );
    const newObject = { ...newCheckIns[index][monthYearString], newValue };
    newCheckIns[index][monthYearString] = newObject;
    console.log(newCheckIns);
    setCheckIns(newCheckIns);
    handleCheckedInDatesStyle(date);
    handleDateUpdate(date);
  };
  //console.log(checkIns);

  return (
    <View style={MyCalendarStyles.container}>
      {checkIns?.length && selectedDate && !loading && (
        <CalendarStrip
          scrollToOnSetSelectedDate
          scrollable
          style={MyCalendarStyles.calendarStrip}
          calendarHeaderStyle={MyCalendarStyles.nonHighlightedText}
          dateNumberStyle={MyCalendarStyles.nonHighlightedText}
          dateNameStyle={MyCalendarStyles.nonHighlightedText}
          highlightDateNumberStyle={MyCalendarStyles.highlightedText}
          highlightDateNameStyle={MyCalendarStyles.highlightedText}
          highlightDateContainerStyle={
            MyCalendarStyles.highlightedDateContainer
          }
          onDateSelected={(date) => handleDateUpdate(new Date(date))}
          selectedDate={selectedDate}
          maxDate={today}
          customDatesStyles={handleCheckedInDatesStyle}
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
                  handleNewCheckIn,
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
