import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import Styles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import MonthPicker from 'react-native-month-year-picker';
import NoDataMessage from './NoDataMessage';
import DateSelect from './components/DateSelect';
import { DB } from '../../config';
import { intlPolyfill, getDataAverageScores } from './MyData.utils';
import ButtonGroup from './components/ButtonGroup';
import OverallScoreArea from './components/OverallScoreArea';
import { getMonthYearString, getPreviousMonthYearString } from '../../utils';
import Loading from '../Loading';
import RecommendationsButton from './components/RecommendationsButton';
import DataDisplayBox from './components/DataDisplayBox';

const labels = ['Sound Intensity', 'Sleep', 'Mood', 'Stress Level'];

intlPolyfill();

const MyData = ({ navigation: { navigate } }) => {
  const currentUser = auth().currentUser.uid;

  const [checkIns, setCheckIns] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthPickerValue, setMonthPickerValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const [currentDataButton, setCurrentDataButton] = useState('soundIntensity');
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [numEntries, setNumEntries] = useState(0);
  const [scoreArray, setScoreArray] = useState(null);
  const [lastMonthScoreArray, setLastMonthScoreArray] = useState(null);

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
            let dataArray = [];
            for (var key in querySnapshot.val()) {
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

  useEffect(() => {
    if (checkIns?.length) {
      const thisMonthData = getDataAverageScores(
        checkIns,
        getMonthYearString(monthPickerValue),
      );
      setNumEntries(thisMonthData?.length);
      setScoreArray(Object.values(thisMonthData));

      const lastMonthData = Object.values(
        getDataAverageScores(
          checkIns,
          getPreviousMonthYearString(monthPickerValue),
        ),
      );
      setLastMonthScoreArray(lastMonthData);
    } else {
      setNumEntries(0);
    }
  }, [checkIns, monthPickerValue]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (scoreArray) {
      setIsLoading(false);
    }
    if (!scoreArray?.length) {
      setNumEntries(0);
    }
  }, [scoreArray]);

  const hasImprovedFromLastMonth =
    (lastMonthScoreArray?.[currentButtonIndex] &&
      -1 *
        (lastMonthScoreArray?.[currentButtonIndex] -
          scoreArray?.[currentButtonIndex]) >
        0) ||
    true;

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
              flex: 0.6,
              padding: 12,
              paddingTop: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <DataDisplayBox
              scoreArray={scoreArray}
              currentButtonIndex={currentButtonIndex}
              labels={labels}
              hasImprovedFromLastMonth={hasImprovedFromLastMonth}
              lastMonthScoreArray={lastMonthScoreArray}
            />
            <RecommendationsButton
              handleClick={() => navigate('Recommendations')}
            />
          </View>
        </>
      )}
      {numEntries === 0 && !isLoading && <NoDataMessage />}
      {numEntries === 0 && isLoading && <Loading />}
    </View>
  );
};

export default MyData;
