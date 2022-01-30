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
  sleepEntries,
  stressEntries,
} from './MyData.utils';
import FilterPicker from './components/FilterPicker';
import OverallScoreArea from './components/OverallScoreArea';
import { getMonthYearString, getPreviousMonthYearString } from '../../utils';
import Loading from '../Loading';
import RecommendationsButton from './components/RecommendationsButton';
import DataDisplayBox from './components/DataDisplayBox';
import { useFetchCheckins } from './hooks/useFetchCheckins.hook';
import { useHasImprovedFromLastMonth } from './hooks/useHasImprovedFromLastMonth.hook';
import { fetchRecommendations } from '../../api/RecommendationsApi';
import { v4 as uuid } from 'uuid';
import { setRecommendations } from '../../api/RecommendationsApi';
import { useToast } from 'native-base';

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
const initialChipState = {
  sleep: sleepEntries.map((element) => ({
    label: element,
    selected: false,
    attempted: false,
    id: uuid(),
    category: 'sleep',
  })),
  stress: stressEntries.map((element) => ({
    label: element,
    selected: false,
    attempted: false,
    id: uuid(),
    category: 'stress',
  })),
};
intlPolyfill();

const MyData = ({ navigation: { navigate } }) => {
  const currentUser = auth().currentUser.uid;
  const today = new Date();
  const toast = useToast();

  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthPickerValue, setMonthPickerValue] = useState(new Date());
  const [numEntries, setNumEntries] = useState(0);
  const [scoreArray, setScoreArray] = useState(null);
  const [lastMonthScoreArray, setLastMonthScoreArray] = useState(null);
  const [scoreArraysLoaded, setScoreArraysLoaded] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [chips, setChips] = useState(initialChipState);
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

  const showPicker = useCallback((value) => {
    setShowMonthPicker(value);
  }, []);

  const onValueChange = useCallback((event, newDate) => {
    const selectedDate = newDate || monthPickerValue;
    showPicker(false);
    setMonthPickerValue(selectedDate);
  }, []);

  const handleScoreArrays = () => {
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
    setLastMonthScoreArray([
      soundIntensityScoreLast,
      soundPitchScoreLast,
      sleepScoreLast,
      moodScoreLast,
      stressScoreLast,
    ]);
    setScoreArraysLoaded(newScoreArray?.every((element) => !isNaN(element)));
  };

  const handleUpdateChips = (newChips) => {
    if (newChips) {
      setChips(newChips);
    } else {
      setChips(initialChipState);
    }
  };

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

  useEffect(() => {
    fetchRecommendations(
      currentUser,
      handleUpdateChips,
      new Date(monthPickerValue),
    );
  }, [monthPickerValue]);

  const handleClick = (type, chip) => {
    if (chip.selected) {
      toast.show({
        duration: 3000,
        title: 'Added to your dashboard',
        isClosable: true,
        status: 'success',
      });
    }
    const newChips = JSON.parse(JSON.stringify(chips));
    const selectedElement = newChips[type].find(
      (element) => element.label === chip.label,
    );
    selectedElement.selected = chip.selected;

    if (!chip.selected) {
      selectedElement.attempted = false;
    }

    setRecommendations(currentUser, today, newChips).then(() =>
      setChips(newChips),
    );
  };

  const attemptedReliefs = chips[`${filterPickerValue?.category}`]?.filter(
    (element) => element.attempted,
  );

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
            style={{ flex: 0.5, display: 'flex', marginTop: 16 }}
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
          {filterPickerValue && (
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
              <RecommendationsButton
                handleClick={() =>
                  navigate('Relief', {
                    date: JSON.stringify(monthPickerValue),
                    handleClick,
                    chips,
                  })
                }
              />
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
