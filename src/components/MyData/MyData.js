import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import Styles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import MonthPicker from 'react-native-month-year-picker';
import NoDataMessage from './NoDataMessage';
import DateSelect from './components/DateSelect';
import {
  intlPolyfill,
  getDataAverageScores,
  findAndTransformDataset,
} from './MyData.utils';
import FilterPicker from './components/FilterPicker';
import OverallScoreArea from './components/OverallScoreArea';
import { getMonthYearString, getPreviousMonthYearString } from '../../utils';
import Loading from '../Loading';
import RecommendationsButton from './components/RecommendationsButton';
import DataDisplayBox from './components/DataDisplayBox';
import { useFetchCheckins } from './hooks/useFetchCheckins.hook';
import { useHasImprovedFromLastMonth } from './hooks/useHasImprovedFromLastMonth.hook';
import useFetchRecommendations from './hooks/useFetchRecommendations.hook';

const labels = [
  {
    label: 'Sound Intensity',
    value: 'soundIntensity',
    category: 'sound',
  },
  { label: 'Sound Pitch', value: 'soundPitch', category: 'sound' },
  { label: 'Sleep', value: 'sleepHours', category: 'sleep' },
  { label: 'Mood', value: 'mood', catergory: 'mood' },
  { label: 'Stress Level', value: 'stressLevel', category: 'stress' },
];

intlPolyfill();

const MyData = ({ navigation: { navigate } }) => {
  const currentUser = auth().currentUser.uid;
  const today = new Date();

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthPickerValue, setMonthPickerValue] = useState(new Date());
  const [numEntries, setNumEntries] = useState(0);
  const [scoreArray, setScoreArray] = useState(null);
  const [lastMonthScoreArray, setLastMonthScoreArray] = useState(null);
  const [scoreArraysLoaded, setScoreArraysLoaded] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [filterPickerValue, setFilterPickerValue] = useState(labels[0]);
  const [filterIndex, setFilterIndex] = useState(0);

  const highValueIsGood =
    filterPickerValue?.label === 'Sleep' || filterPickerValue?.label === 'Mood';

  const pickerYear = monthPickerValue.getFullYear();
  const { checkins, lastMonthCheckins, checkinsLoaded } = useFetchCheckins({
    currentUser,
    monthPickerValue,
    pickerYear,
  });

  const hasImprovedFromLastMonth = useHasImprovedFromLastMonth({
    scoreArray,
    lastMonthScoreArray,
    highValueIsGood,
    filterIndex,
  });

  const { chips, setChips } = useFetchRecommendations({
    currentUser,
    monthPickerValue,
  });

  const showPicker = useCallback((value) => {
    setShowMonthPicker(value);
  }, []);

  const onValueChange = useCallback((event, newDate) => {
    const selectedDate = newDate || monthPickerValue;
    showPicker(false);
    setMonthPickerValue(selectedDate);
  }, []);

  const handleScoreArrays = () => {
    if (lastMonthScoreArray || scoreArray) {
      setLastMonthScoreArray(null);
      setScoreArray(null);
    }
    setScoreArraysLoaded(false);
    let lastMonthData;

    const thisMonthData = getDataAverageScores(
      checkins,
      getMonthYearString(monthPickerValue),
    );

    if (lastMonthCheckins) {
      lastMonthData = getDataAverageScores(
        lastMonthCheckins,
        getPreviousMonthYearString(monthPickerValue),
      );
    } else {
      lastMonthData = getDataAverageScores(
        checkins,
        getPreviousMonthYearString(monthPickerValue),
      );
    }

    const {
      soundIntensityScore,
      soundPitchScore,
      sleepScore,
      moodScore,
      stressScore,
    } = thisMonthData || null;

    const {
      soundIntensityScore: soundIntensityScoreLast,
      soundPitchScore: soundPitchScoreLast,
      sleepScore: sleepScoreLast,
      moodScore: moodScoreLast,
      stressScore: stressScoreLast,
    } = lastMonthData || null;

    setNumEntries(thisMonthData?.length);
    const newScoreArray = [
      soundIntensityScore,
      soundPitchScore,
      sleepScore,
      moodScore,
      stressScore,
    ];
    setScoreArray(newScoreArray);

    const newLastMonthScoreArray = [
      soundIntensityScoreLast,
      soundPitchScoreLast,
      sleepScoreLast,
      moodScoreLast,
      stressScoreLast,
    ];
    setLastMonthScoreArray(newLastMonthScoreArray);
    const thisMonthScoreArrayLoaded = newScoreArray !== null;
    const lastMonthScoreArrayLoaded = newLastMonthScoreArray !== null;
    setScoreArraysLoaded(
      thisMonthScoreArrayLoaded && lastMonthScoreArrayLoaded,
    );
  };

  console.log(checkins);
  useEffect(() => {
    if (checkins) {
      setDataset(
        findAndTransformDataset(
          checkins,
          labels,
          filterPickerValue,
          getMonthYearString(monthPickerValue),
        ),
      );
    }
  }, [filterPickerValue, checkins, lastMonthCheckins, monthPickerValue]);

  useEffect(() => {
    if (checkins?.length) {
      handleScoreArrays();
    } else {
      setScoreArraysLoaded(true);
    }
  }, [checkins, lastMonthCheckins, monthPickerValue]);

  const attemptedReliefs =
    chips &&
    chips[`${filterPickerValue?.category}`]?.filter(
      (element) => element.attempted,
    );

  console.log(numEntries, checkinsLoaded, scoreArraysLoaded);
  return (
    <View style={Styles.container}>
      {showMonthPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={monthPickerValue}
          minimumDate={new Date(2021, 0)}
          maximumDate={new Date(today.getFullYear(), today.getMonth())}
        />
      )}
      <DateSelect
        numEntries={numEntries}
        showPicker={showPicker}
        monthPickerValue={monthPickerValue}
      />
      {checkinsLoaded && numEntries !== 0 && scoreArraysLoaded && (
        <>
          <OverallScoreArea
            numEntries={numEntries}
            scoreArray={scoreArray}
            monthPickerValue={monthPickerValue}
            showPicker={showPicker}
            style={{
              flex: 0.55,
              display: 'flex',
              marginTop: 16,
            }}
          />
          <View
            style={{
              width: '90%',
              height: 1,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 25,
            }}
          />
          <FilterPicker
            items={labels}
            setFilterIndex={setFilterIndex}
            setFilterPickerValue={setFilterPickerValue}
            filterPickerValue={filterPickerValue}
            style={{
              flex: 0.15,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignContent: 'space-around',
            }}
          />
          {filterPickerValue && scoreArraysLoaded && (
            <View
              style={{
                flex: 0.6,
                padding: 12,
                paddingTop: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <DataDisplayBox
                scoreArray={scoreArray}
                filterPickerValue={filterPickerValue}
                filterIndex={filterIndex}
                labels={labels}
                hasImprovedFromLastMonth={hasImprovedFromLastMonth}
                lastMonthScoreArray={lastMonthScoreArray}
                datasetLength={dataset?.length}
                handleDataNavigate={() =>
                  dataset?.length &&
                  navigate('Data Display', {
                    dataset,
                    title: filterPickerValue?.label,
                    month: monthPickerValue,
                    chips: JSON.stringify(attemptedReliefs),
                  })
                }
                highValueIsGood={highValueIsGood}
                chips={chips}
              />
              {today.getMonth() === monthPickerValue.getMonth() && (
                <RecommendationsButton handleClick={() => navigate('Relief')} />
              )}
            </View>
          )}
        </>
      )}
      {numEntries === 0 && checkinsLoaded && scoreArraysLoaded && (
        <NoDataMessage />
      )}
      {(!checkinsLoaded || !scoreArraysLoaded) && <Loading />}
    </View>
  );
};

export default MyData;
