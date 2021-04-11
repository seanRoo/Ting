import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardItem } from 'native-base';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import GraphViewDropdown from './GraphViewDropdown';
import MyDataStyles from './MyData.styles';
import auth from '@react-native-firebase/auth';
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
    <View style={{ height: '100%', paddingTop: 20 }}>
      <ScrollView contentContainerStyle={MyDataStyles.scrollView}>
        {/* <GraphViewDropdown
          setGraphView={setGraphView}
          graphView={graphView}
          customStyles={{ alignSelf: 'flex-start' }}
        /> */}
        <View
          style={{
            width: '98%',
            justifyContent: 'center',
            borderRadius: 24,
            height: 210,
            borderWidth: 1,
            backgroundColor: 'white',
            paddingRight: 20,
          }}
        >
          <View>
            <Text style={{ paddingLeft: 18, fontSize: 18, marginBottom: 12 }}>
              Sleep - Hours
            </Text>
            <LineChart data={sliderData} />
          </View>
        </View>
        <View
          style={{
            width: '98%',
            justifyContent: 'center',
            borderRadius: 24,
            height: 210,
            borderWidth: 1,
            backgroundColor: 'white',
            paddingRight: 20,
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{ paddingLeft: 18, fontSize: 18, marginBottom: 12 }}>
              Stress Level
            </Text>
            <LineChart data={sliderData} />
          </View>
        </View>
        <View
          style={{
            width: '98%',
            justifyContent: 'center',
            borderRadius: 24,
            height: 250,
            borderWidth: 1,
            backgroundColor: 'white',
            paddingRight: 20,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontSize: 18,
                paddingLeft: 18,
              }}
            >
              Sounds
            </Text>
            <PieChart />
          </View>
        </View>
        {/* <Card
        style={{
          width: '95%',
          alignSelf: 'center',
          borderRadius: 16,
          height: '78%',
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderRadius: 16,
            borderColor: 'orchid',
            flex: 1,
          }}
        >
          {!loading && (
            <View style={{ flex: 1 }}>
              <MonthSelector
                disabledArrows={disabledArrows}
                handleMonthUpdate={handleMonthUpdate}
                monthsArrayIndex={monthsArrayIndex}
              />
              {!showNoDataMessage && (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <CardItem>
                    {graphView.value === 'sounds' && pieData && (
                      <PieChart data={pieData} height={normalize(190)} />
                    )}
                    {graphView.value === 'sleepAndStress' && sliderData && (
                      <View>
                        <LineChart height={normalize(210)} data={sliderData} />
                      </View>
                    )}
                  </CardItem>
                  <CardItem
                    footer
                    style={{
                      borderRadius: 16,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      * Data from {dataEntries} entries
                    </Text>
                  </CardItem>
                </View>
              )}
              {showNoDataMessage && <NoDataMessage />}
            </View>
          )}
          {loading && <Loading />}
        </View>
      </Card> */}
      </ScrollView>
    </View>
  );
};

export default MyData;
