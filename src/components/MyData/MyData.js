import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import Styles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MonthPicker from 'react-native-month-year-picker';
import NoDataMessage from './NoDataMessage';
import DateSelect from './components/DateSelect';
import { DB } from '../../config';
import { transformDataSets } from './MyData.utils';
import LinearGuage from './components/LinearGuage';
import ButtonGroup from './components/ButtonGroup';
import OverallScoreArea from './components/OverallScoreArea';
import { getMonthYearString } from '../../utils';

const labels = ['Sound Intensity', 'Sleep', 'Mood', 'Stress Level'];

if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/en-IN'); // load the required locale details
  Intl.__disableRegExpRestore();
}

const MyData = () => {
  const today = new Date();
  let lastSevenDays = [];
  for (var i = 1; i <= 7; i++) {
    const newDateEntry = new Date(
      Date.now() - i * 24 * 60 * 60 * 1000,
    ).getDate();
    lastSevenDays.push(newDateEntry);
  }

  const currentUser = auth().currentUser.uid;

  const [checkIns, setCheckIns] = useState(null);
  const [emptyData, setEmptyData] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthPickerValue, setMonthPickerValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [currentDataButton, setCurrentDataButton] = useState('soundIntensity');
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [numEntries, setNumEntries] = useState(0);
  const [scoreArray, setScoreArray] = useState(null);

  //console.log(lastSevenDays);

  // const handleFilterUpdate = (selectedFilter) => {
  //   const newState = [...dataset];
  //   newState.map((option) => {
  //     if (option.name === selectedFilter.name) {
  //       option.toggled = !selectedFilter.toggled;
  //     }
  //   });
  //   setDataset(newState);
  // };

  const showPicker = useCallback((value) => setShowMonthPicker(value), []);

  const onValueChange = useCallback((event, newDate) => {
    const selectedDate = newDate || monthPickerValue;
    showPicker(false);
    setMonthPickerValue(selectedDate);
  }, []);

  const getData = () => {
    try {
      DB.ref(`/checkIns/${currentUser}/${monthPickerValue.getFullYear()}/`).on(
        'value',
        (querySnapshot) => {
          if (querySnapshot.val()) {
            //console.log(querySnapshot.val());
            let dataArray = [];
            for (var key in querySnapshot.val()) {
              //console.log(key, querySnapshot.val()[key]);
              dataArray.push({ [key]: querySnapshot.val()[key] });
            }

            setCheckIns(dataArray);
          } else {
            setCheckIns([]);
          }
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  const getDataAverageScores = (data) => {
    let sleepScore = 0,
      soundIntensityScore = 0,
      moodScore = 0,
      stressScore = 0,
      length = 0;
    if (data?.length) {
      const monthElement = [...data].filter(
        (element) =>
          Object.keys(element)[0] === getMonthYearString(monthPickerValue),
      );
      console.log(monthElement);
      const filteredData =
        (monthElement.length && Object.values(monthElement[0])) || null;
      if (filteredData) {
        console.log('fired');
        length = Object.values(filteredData[0]).length;
        setNumEntries(length);
        Object.values(filteredData[0]).forEach((element) => {
          const values = element.sliderValues;
          const { mood, sleepHours, soundIntensity, stressLevel } = values;
          moodScore += mood;
          sleepScore += sleepHours;
          soundIntensityScore += soundIntensity;
          stressScore += stressLevel;
        });
      } else {
        setNumEntries(0);
      }
    }
    return {
      sleepScore: Math.trunc((sleepScore / length) * 10),
      moodScore: Math.trunc((moodScore / length) * 10),
      soundIntensityScore: Math.trunc((soundIntensityScore / length) * 10),
      stressScore: Math.trunc((stressScore / length) * 10),
    };
  };

  //console.log(JSON.stringify(checkIns));

  useEffect(() => {
    if (checkIns?.length) {
      const { sleepScore, moodScore, soundIntensityScore, stressScore } =
        getDataAverageScores(checkIns);

      setScoreArray([soundIntensityScore, sleepScore, moodScore, stressScore]);
    }
  }, [checkIns, monthPickerValue]);

  // const getData = () => {
  //   setIsLoading(true);
  // const year = monthPickerValue.getFullYear();
  // const month = String(monthPickerValue.getMonth() + 1);
  // const monthYearValue = `${year}-${month}`;
  // try {
  //   DB.ref(`/checkIns/${currentUser}/${year}/${monthYearValue}`).on(
  //     'value',
  //     (querySnapshot) => {
  //         const responseArray = querySnapshot.val();
  //         let sleepArray = [];
  //         let soundIntensityArray = [];
  //         let soundPitchArray = [];
  //         let moodArray = [];
  //         let stressLevelArray = [];
  //         [...Array(31).keys()].map((num) => {
  //           if (responseArray && responseArray[num]) {
  //             const sleepValue = {
  //               x: num,
  //               y: responseArray[num].sliderValues.sleepHours,
  //             };
  //             const soundIntensityValue = {
  //               x: num,
  //               y: responseArray[num].sliderValues.soundIntensity,
  //             };
  //             const stressLevelValue = {
  //               x: num,
  //               y: responseArray[num].sliderValues.stressLevel,
  //             };
  //             const moodValue = {
  //               x: num,
  //               y: responseArray[num].sliderValues.mood,
  //             };
  //             const soundPitchValue = {
  //               x: num,
  //               y: responseArray[num].sliderValues.soundPitch,
  //             };
  //             sleepArray.push(sleepValue);
  //             soundIntensityArray.push(soundIntensityValue);
  //             stressLevelArray.push(stressLevelValue);
  //             moodArray.push(moodValue);
  //             soundPitchArray.push(soundPitchValue);
  //           }
  //         });

  //         const transformedDataSets = transformDataSets({
  //           sleepData: filterNullValues(sleepArray),
  //           soundIntensityData: filterNullValues(soundIntensityArray),
  //           moodData: filterNullValues(moodArray),
  //           soundPitchData: filterNullValues(soundPitchArray),
  //           stressLevelData: filterNullValues(stressLevelArray),
  //         });
  //         setDataset(transformedDataSets);
  //       },
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   setEmptyData(dataset?.every((dataObject) => !dataObject.data.length));
  // }, [dataset]);

  // console.log(dataset);

  //console.log(getMonthYearString(monthPickerValue));
  return (
    <View style={Styles.container}>
      {showMonthPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={monthPickerValue}
          minimumDate={new Date(2021, 0)}
          maximumDate={new Date(2021, 11)}
        />
      )}
      <DateSelect
        numEntries={numEntries}
        showPicker={showPicker}
        monthPickerValue={monthPickerValue}
        style={{ marginRight: 10, width: '30%' }}
      />
      {checkIns && scoreArray && numEntries !== 0 && (
        <>
          <OverallScoreArea
            numEntries={numEntries}
            scoreArray={scoreArray}
            monthPickerValue={monthPickerValue}
            showPicker={showPicker}
            style={{ flex: 0.5, display: 'flex' }}
          />
          <View
            style={{
              width: '90%',
              height: 1,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 25,
            }}
          />
          <ButtonGroup
            currentDataButton={currentDataButton}
            setCurrentDataButton={setCurrentDataButton}
            currentButtonIndex={currentButtonIndex}
            setCurrentButtonIndex={setCurrentButtonIndex}
            style={{
              flex: 0.15,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignContent: 'space-around',
            }}
          />
          <View
            style={{
              flex: 0.5,
              padding: 12,
              paddingTop: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flex: 0.3,
                flexDirection: 'row',
                padding: 8,
                borderRadius: 10,
                backgroundColor: 'rgba(152, 251, 152,.3)',
              }}
            >
              <View style={{ flex: 0.5, justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {scoreArray[currentButtonIndex]}% average
                </Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>
                  {labels[currentButtonIndex]}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    borderColor: 'grey',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="arrow-down"
                      color="green"
                      size={28}
                    />
                    <Text style={{ fontSize: 24, color: 'green' }}>-2%</Text>
                  </View>
                  <Text
                    style={{
                      color: 'grey',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 12,
                    }}
                  >
                    Improved from last week
                  </Text>
                </View>
              </View>
            </View>
            <LinearGuage
              startLabel="Low"
              endLabel="High"
              style={{
                justifyContent: 'center',
                flex: 0.3,
              }}
              value={scoreArray[currentButtonIndex]}
            />
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: '#1c98e6',
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}
                >
                  View Recommendations
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {numEntries === 0 && <NoDataMessage />}
      {/* {!emptyData && (
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
      )} */}
      {/* {emptyData && isLoading && <Loading />} */}
    </View>
  );
};

export default MyData;
