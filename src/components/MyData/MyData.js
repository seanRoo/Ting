import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Platform, Share } from 'react-native';
import LineChart from '../LineChart';
import Styles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MonthPicker from 'react-native-month-year-picker';
import { DB } from '../../config';
import { transformDataSets, onShare } from './MyData.utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterTabs from './FilterTabs';
import { Divider } from 'react-native-elements';
import NoDataMessage from './NoDataMessage';
import Loading from '../Loading';

if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/en-IN'); // load the required locale details
  Intl.__disableRegExpRestore();
}

const MyData = () => {
  const currentUser = auth().currentUser.uid;

  const [dataset, setDataset] = useState(null);
  const [emptyData, setEmptyData] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthPickerValue, setMonthPickerValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterUpdate = (selectedFilter) => {
    const newState = [...dataset];
    newState.map((option) => {
      if (option.name === selectedFilter.name) {
        option.toggled = !selectedFilter.toggled;
      }
    });
    setDataset(newState);
  };

  const showPicker = useCallback((value) => setShowMonthPicker(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || monthPickerValue;
      showPicker(false);
      setMonthPickerValue(selectedDate);
    },
    [monthPickerValue],
  );

  const filterNullValues = (objectArray) =>
    objectArray.filter((option) => option.y !== undefined);

  const getData = () => {
    setIsLoading(true);
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

          const transformedDataSets = transformDataSets({
            sleepData: filterNullValues(sleepArray),
            soundIntensityData: filterNullValues(soundIntensityArray),
            moodData: filterNullValues(moodArray),
            soundPitchData: filterNullValues(soundPitchArray),
            stressLevelData: filterNullValues(stressLevelArray),
          });
          setDataset(transformedDataSets);
        },
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [monthPickerValue]);

  useEffect(() => {
    setEmptyData(dataset?.every((dataObject) => !dataObject.data.length));
  }, [dataset]);

  useEffect(() => {
    setDataset(null);
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
              })}, ${dataset?.[0].data.length} results`}
            </Text>
            <MaterialCommunityIcons
              name="pencil"
              size={16}
              style={{ marginLeft: 8, color: 'blue' }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!emptyData && (
        <View style={{ flexDirection: 'column', flex: 0.7 }}>
          <View style={{ marginBottom: 16 }}>
            <LineChart dataset={dataset} />
          </View>
          <Divider />
          <FilterTabs
            handleFilterUpdate={handleFilterUpdate}
            filters={dataset}
          />
        </View>
      )}
      {emptyData && !isLoading && <NoDataMessage />}
      {emptyData && isLoading && <Loading />}
    </View>
  );
};

export default MyData;
