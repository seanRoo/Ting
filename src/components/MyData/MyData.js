import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import LineChart from '../LineChart';
import Styles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MonthPicker from 'react-native-month-year-picker';
import { DB } from '../../config';
import {
  countOccurrences,
  transformCountArray,
  sortData,
} from './MyData.utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterTabs from './FilterTabs';
import ActionButton from './ActionButton';

if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/en-IN'); // load the required locale details
}

const MyData = () => {
  const currentUser = auth().currentUser.uid;

  const [sliderData, setSliderData] = useState({
    sleepData: [],
    soundIntensityData: [],
    soundPitchData: [],
    moodData: [],
    stressLevelData: [],
  });

  const [sleepData, setSleepData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthPickerValue, setMonthPickerValue] = useState(new Date());

  const handleFilterUpdate = (selectedFilter) =>
    filters.includes(selectedFilter)
      ? setFilters(filters.filter((filter) => filter !== selectedFilter))
      : setFilters([...filters, selectedFilter]);

  const showPicker = useCallback((value) => setShowMonthPicker(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || monthPickerValue;

      showPicker(false);
      setMonthPickerValue(selectedDate);
    },
    [monthPickerValue, showPicker],
  );

  const filterNullValues = (objectArray) =>
    objectArray.filter((option) => option.y !== undefined);

  const transformDataSets = () => [
    { name: 'Sleep', data: sliderData.sleepData, color: 'green' },
    {
      name: 'Sound Intensity',
      data: sliderData.soundIntensityData,
      color: 'purple',
    },
    {
      name: 'Sound Pitch',
      data: sliderData.soundPitchData,
      color: 'pink',
    },
    { name: 'Mood', data: sliderData.moodData, color: 'blue' },
    {
      name: 'Stress',
      data: sliderData.stressLevelData,
      color: 'red',
    },
  ];

  const getData = () => {
    const year = monthPickerValue.getFullYear();
    const month = String(monthPickerValue.getMonth() + 1);
    const monthYearValue = `${year}-${month}`;
    try {
      DB.ref(`/checkIns/${currentUser}/${year}/${monthYearValue}`).on(
        'value',
        (querySnapshot) => {
          const responseArray = querySnapshot.val();
          let sleepArray = [];
          let soundIntensityArray = [];
          let soundPitchArray = [];
          let moodArray = [];
          let stressLevelArray = [];
          [...Array(31).keys()].map((num) => {
            if (responseArray && responseArray[num]) {
              const sleepValue = {
                x: num,
                y: responseArray[num].sliderValues.sleepHours,
              };
              const soundIntensityValue = {
                x: num,
                y: responseArray[num].sliderValues.soundIntensity,
              };
              const stressLevelValue = {
                x: num,
                y: responseArray[num].sliderValues.stressLevel,
              };
              const moodValue = {
                x: num,
                y: responseArray[num].sliderValues.mood,
              };
              const soundPitchValue = {
                x: num,
                y: responseArray[num].sliderValues.soundPitch,
              };
              sleepArray.push(sleepValue);
              soundIntensityArray.push(soundIntensityValue);
              stressLevelArray.push(stressLevelValue);
              moodArray.push(moodValue);
              soundPitchArray.push(soundPitchValue);
            }
          });
          setSliderData({
            sleepData: filterNullValues(sleepArray),
            soundIntensityData: filterNullValues(soundIntensityArray),
            moodData: filterNullValues(moodArray),
            soundPitchData: filterNullValues(soundPitchArray),
            stressLevelData: filterNullValues(stressLevelArray),
          });
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [onValueChange]);

  useEffect(() => {
    return () => setSliderData([]);
  }, []);
  return (
    <View style={Styles.container}>
      {showMonthPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={monthPickerValue}
          minimumDate={new Date(2020, 5)}
          maximumDate={new Date(2025, 5)}
        />
      )}
      <View style={Styles.headerSection}>
        <Text style={Styles.headerText}>Data Entries</Text>
        <Text style={Styles.dataEntriesText}>6</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...Styles.headerText, alignSelf: 'center' }}>
            Showing data for:
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderColor: 'black',
              marginLeft: 8,
              padding: 4,
              flexDirection: 'row',
              borderRadius: 10,
            }}
            onPress={() => showPicker(true)}
          >
            <Text style={{ color: 'blue' }}>
              {`${monthPickerValue.toLocaleString('default', {
                month: 'long',
              })}, ${monthPickerValue.toLocaleString('default', {
                year: 'numeric',
              })}`}
            </Text>
            <MaterialCommunityIcons
              name="pencil"
              size={16}
              style={{ marginLeft: 8, color: 'blue' }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.actionButtonContainer}>
        <ActionButton iconName="share-variant" text="Share" />
        <ActionButton iconName="rotate-left" text="Rotate" />
      </View>
      <View style={Styles.lineChartContainer}>
        {(sliderData.sleepData.length && (
          <LineChart height="100%" width="100%" dataset={transformDataSets()} />
        )) || <Text>No Data</Text>}
      </View>
      <FilterTabs handleFilterUpdate={handleFilterUpdate} filters={filters} />
    </View>
  );
};

export default MyData;
