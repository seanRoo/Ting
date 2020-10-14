import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Segment, Card, CardItem, Left } from 'native-base';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import GraphViewDropdown from './GraphViewDropdown';
import MyDataStyles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import Loading from '../Loading';
import Entypo from 'react-native-vector-icons/Entypo';
import { Right } from '../Right';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  monthsArray,
  countOccurrences,
  transformCountArray,
} from './MyData.utils';
import { Center } from '../Center';

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
    rightArrow: false,
    leftArrow: false,
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
            const responseArray = Object.values(querySnapshot.val());
            console.log(responseArray);
            setDataEntries(responseArray.length);
            const sounds = responseArray
              .map((element) => element.sounds)
              .flat();
            console.log(sounds);
            const sliderValues = responseArray
              .map((element) => element.sliderValues)
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
    <View style={MyDataStyles.container}>
      <View style={{ width: '100%', flex: 1, flexDirection: 'column' }}>
        <GraphViewDropdown
          setGraphView={setGraphView}
          graphView={graphView}
          customStyles={{ marginLeft: 12 }}
        />
        <Card
          style={{
            width: Dimensions.get('window').width,
            height: 300,
          }}
        >
          {!loading && (
            <View>
              <CardItem
                header
                style={{
                  justifyContent: 'center',
                  paddingBottom: 5,
                }}
              >
                <Left>
                  <TouchableOpacity
                    disabled={disabledArrows.leftArrow}
                    onPress={() => handleMonthUpdate(-1)}
                  >
                    <Entypo
                      name="triangle-left"
                      size={30}
                      color={disabledArrows.leftArrow ? '#EBEBE4' : 'black'}
                      style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 12,
                        padding: 5,
                      }}
                    />
                  </TouchableOpacity>
                </Left>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {monthsArray[monthsArrayIndex]}
                </Text>
                <Right>
                  <TouchableOpacity
                    disabled={disabledArrows.rightArrow}
                    onPress={() => handleMonthUpdate(1)}
                  >
                    <Entypo
                      name="triangle-right"
                      size={30}
                      color={disabledArrows.rightArrow ? '#EBEBE4' : 'black'}
                      style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 12,
                        padding: 5,
                      }}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              {!showNoDataMessage && (
                <>
                  <CardItem>
                    {graphView.value === 'sounds' && pieData && (
                      <PieChart data={pieData} height={220} />
                    )}
                    {graphView.value === 'sleepAndStress' && sliderData && (
                      <LineChart
                        height={220}
                        width={Dimensions.get('window').width - 30}
                        data={sliderData}
                      />
                    )}
                  </CardItem>
                  <CardItem footer>
                    <Text>*Data from {dataEntries} entries</Text>
                  </CardItem>
                </>
              )}
              {showNoDataMessage && (
                <CardItem style={{ height: 250 }}>
                  <Center>
                    <Text>No data found</Text>
                    <Text>Have you checked in for this month?</Text>
                  </Center>
                </CardItem>
              )}
            </View>
          )}
          {loading && <Loading />}
        </Card>
      </View>
    </View>
  );
};

export default MyData;
