import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardItem } from 'native-base';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import GraphViewDropdown from './GraphViewDropdown';
import MyDataStyles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DB } from '../../config';
import Loading from '../Loading';
import {
  countOccurrences,
  transformCountArray,
  sortData,
} from './MyData.utils';
import MonthSelector from './MonthSelector';
import NoDataMessage from './NoDataMessage';
import { normalize } from '../Discussions/Discussion.utils';
import { Center } from '../Center';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterTabs from './FilterTabs';

const MyData = () => {
  const currentUser = auth().currentUser.uid;
  const [graphView, setGraphView] = useState({
    value: 'sounds',
    text: 'Sounds',
  });
  const [countArray, setCountArray] = useState();
  const [pieData, setPieData] = useState();
  const [dataEntries, setDataEntries] = useState();
  const [loading, setLoading] = useState(true);
  const [monthsArrayIndex, setMonthsArrayIndex] = useState(
    new Date().getMonth(),
  );
  const [disabledArrows, setDisabledArrows] = useState({
    rightArrow: new Date().getMonth() === 11,
    leftArrow: new Date().getMonth() === 1,
  });
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [sliderData, setSliderData] = useState();
  const [filters, setFilters] = useState([]);

  const handleFilterUpdate = (selectedFilter) =>
    filters.includes(selectedFilter)
      ? setFilters(filters.filter((filter) => filter !== selectedFilter))
      : setFilters([...filters, selectedFilter]);

  const handleMonthUpdate = (direction) => {
    setLoading(true);
    setShowNoDataMessage(false);
    const newIndex = monthsArrayIndex + direction;
    setMonthsArrayIndex(newIndex);
    setDisabledArrows({
      rightArrow: newIndex === 11,
      leftArrow: newIndex === 0,
    });
  };

  const getMonthlyData = (month) => {
    const today = new Date();
    const mm = month || String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = String(today.getFullYear());
    const monthYearValue = `${yyyy}-${mm}`;
    let test = null;
    try {
      DB.ref(`/checkIns/${currentUser}/${monthYearValue}`).on(
        'value',
        (querySnapshot) => {
          if (querySnapshot.val()) {
            const responseArray = sortData(querySnapshot.val());
            setDataEntries(responseArray.length);
            const sounds = [
              ...responseArray.map((element) => element.sounds).flat(),
            ];
            const sliderValues = responseArray
              .map((element) => ({
                date: element.date,
                sliderValues: element.sliderValues,
              }))
              .flat();
            setCountArray(countOccurrences(sounds));
            setSliderData(sliderValues);
            setLoading(false);
          } else {
            console.log('No data!');
            setShowNoDataMessage(true);
            setLoading(false);
          }
        },
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    return test;
  };

  useEffect(() => {
    getMonthlyData(monthsArrayIndex + 1);
  }, [monthsArrayIndex]);

  useEffect(() => {
    if (countArray) {
      setPieData(transformCountArray(countArray));
    }
  }, [countArray]);

  useEffect(() => {}, [sliderData]);
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 0.2 }}>
        <View style={{ flex: 0.7, flexDirection: 'row', marginTop: 12 }}>
          <View>
            <Text style={{ color: 'black', marginBottom: 4 }}>
              Data Entries
            </Text>
            <Text style={{ fontSize: 24, color: 'black' }}>6</Text>
            <Text style={{ color: 'black', marginTop: 4 }}>
              Showing data for: April 2020
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderRadius: 10,
            backgroundColor: 'white',
            marginRight: 8,
          }}
        >
          <Text style={{ fontSize: 14 }}>Share</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 14 }}
            name="share-variant"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            padding: 5,
            borderRadius: 10,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 14 }}>Rotate</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 14 }}
            name="rotate-left"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.7,
          backgroundColor: 'whitesmoke',
          borderWidth: 1,
          borderRadius: 4,
        }}
      >
        <LineChart height="100%" width="100%" />
      </View>
      <FilterTabs handleFilterUpdate={handleFilterUpdate} filters={filters} />
    </View>
  );
};

export default MyData;
