import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import { View, ScrollView } from 'react-native';
import Loading from '../Loading';
import { Center } from '../Center';
import CalendarStrip from 'react-native-calendar-strip';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getMonthYearString } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import EmptyDataMessage from './components/EmptyDataMessage';
import DataDisplaySection from './components/DataDisplaySection';
import MyCalendarStyles from './MyCalendar.styles';

const MyCalendar = ({ navigation, route }) => {
  const today = new Date();
  const dashboardDate = route?.params?.dashboardDate;
  const currentUser = auth().currentUser.uid;
  const [checkIns, setCheckIns] = useState();
  const [monthYearString, setMonthYearString] = useState(
    getMonthYearString(today),
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const [selectedDate, setSelectedDate] = useState(today);

  const getCheckIns = (userId, year) => {
    DB.ref(`/checkIns/${userId}/${year}`).on('value', (querySnapshot) => {
      let data = querySnapshot.val();
      setCheckIns(data);
      setLoading(false);
    });
  };

  const handleDateUpdate = (day = selectedDate) => {
    if (getMonthYearString(day) !== monthYearString) {
      setMonthYearString(day);
    }
    setSelectedDate(day);
    setData(null);
    const date = new Date(day);

    setLoading(true);
    checkIns &&
      setData(
        checkIns[`${date.getFullYear()}-${date.getMonth() + 1}`]?.[
          `${date.getDate()}`
        ],
      );
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      selectedDate && getCheckIns(currentUser, selectedDate.getFullYear());
      dashboardDate && handleDateUpdate(dashboardDate);
    }, [navigation, dashboardDate]),
  );

  useEffect(() => {
    if (!data && checkIns) {
      handleDateUpdate();
    }
  }, [data, checkIns]);

  const handleCheckedInDatesStyle = (date) => {
    const newDate = new Date(date);
    if (
      checkIns &&
      checkIns[`${newDate.getFullYear()}-${newDate.getMonth() + 1}`]?.[
        `${newDate.getDate()}`
      ]
    ) {
      return {
        dateContainerStyle: { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
      };
    }
  };

  return (
    <View style={MyCalendarStyles.container}>
      {selectedDate && !loading && (
        <CalendarStrip
          style={MyCalendarStyles.calendarStrip}
          calendarHeaderStyle={MyCalendarStyles.nonHighlightedText}
          dateNumberStyle={MyCalendarStyles.nonHighlightedText}
          dateNameStyle={MyCalendarStyles.nonHighlightedText}
          highlightDateNumberStyle={MyCalendarStyles.highlightedText}
          highlightDateNameStyle={MyCalendarStyles.highlightedText}
          highlightDateContainerStyle={
            MyCalendarStyles.highlightedDateContainer
          }
          onDateSelected={handleDateUpdate}
          selectedDate={selectedDate}
          maxDate={today}
          scrollToOnSetSelectedDate
          scrollable
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
        {!data && !loading && (
          <Center>
            <EmptyDataMessage
              handleClick={() =>
                navigation.push('Check In', {
                  date: selectedDate,
                  monthYearString,
                })
              }
            />
          </Center>
        )}
        {!loading && data && (
          <ScrollView style={MyCalendarStyles.scrollViewContainer}>
            <DataDisplaySection
              data={[
                {
                  value: data.sliderValues.mood / 10,
                  heading: 'Mood',
                  highValueIsBad: false,
                },
                {
                  value: data.sliderValues.stressLevel / 10,
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
                  value: data.sliderValues.soundIntensity / 10,
                  highValueIsBad: true,
                },
                {
                  heading: 'Sound Pitch',
                  value: data.sliderValues.soundPitch / 10,
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
                  value: data.sliderValues.sleepHours / 10,
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
