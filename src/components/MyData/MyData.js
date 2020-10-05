import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Segment, Card, CardItem } from 'native-base';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import GraphViewDropdown from './GraphViewDropdown';
import MyDataStyles from './MyData.styles';
import auth from '@react-native-firebase/auth';
import { DB } from '../../config';
import Loading from '../Loading';

const MyData = () => {
  const currentUser = auth().currentUser.uid;
  const [buttonState, setButtonState] = useState({
    week: true,
    month: false,
    year: false,
  });
  const [graphView, setGraphView] = useState('pie');
  const [countArray, setCountArray] = useState();
  const [pieData, setPieData] = useState();
  const [dataEntries, setDataEntries] = useState();
  const [loading, setLoading] = useState(true);

  const transformCountArray = (countArray) => {
    const transformedArray = [];
    for (const [key, val] of Object.entries(countArray)) {
      transformedArray.push({
        name: key,
        percentage: (Math.floor(val) / 15) * 100,
        legendFontColor: 'black',
        legendFontSize: 15,
        color:
          '#' +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
      });
    }
    transformedArray.sort((a, b) => (a.name > b.name ? 1 : -1));
    return transformedArray;
  };

  const countOccurrences = (array) => {
    const countArray = array.reduce((acc, curr) => {
      if (typeof acc[curr] === 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
    return countArray;
  };

  const getMonthlyData = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = String(today.getFullYear());
    const monthYearValue = `${yyyy}-${mm}`;
    try {
      DB.ref(`/checkIns/${currentUser}/${monthYearValue}`).on(
        'value',
        (querySnapshot) => {
          if (querySnapshot.val()) {
            const responseArray = Object.values(querySnapshot.val());
            setDataEntries(responseArray.length);
            const sounds = responseArray
              .map((element) => element.sounds)
              .flat();
            setCountArray(countOccurrences(sounds));
            setLoading(false);
          }
        },
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!countArray) {
      getMonthlyData();
    }
    if (countArray) {
      setPieData(transformCountArray(countArray));
    }
  }, [countArray]);
  return (
    <View style={MyDataStyles.container}>
      <Segment style={MyDataStyles.buttonContainer}>
        <Button
          onPress={() =>
            setButtonState({
              week: true,
              month: false,
              year: false,
            })
          }
          active={buttonState.week}
          first
          style={MyDataStyles.buttons}
        >
          <Text>Week</Text>
        </Button>
        <Button
          onPress={() =>
            setButtonState({
              week: false,
              month: true,
              year: false,
            })
          }
          active={buttonState.month}
          style={MyDataStyles.buttons}
        >
          <Text>Month</Text>
        </Button>
        <Button
          onPress={() =>
            setButtonState({
              week: false,
              month: false,
              year: true,
            })
          }
          active={buttonState.year}
          last
          style={MyDataStyles.buttons}
        >
          <Text>Year</Text>
        </Button>
      </Segment>
      <View style={MyDataStyles.graphContainer}>
        <View style={MyDataStyles.graphViewDropdown}>
          <Text style={{ fontSize: 20 }}>Graph View</Text>
          <GraphViewDropdown
            setGraphView={setGraphView}
            graphView={graphView}
          />
        </View>
        <View style={{ alignSelf: 'center' }}>
          {graphView === 'line' && <LineChart height={350} />}
          {graphView === 'pie' && pieData && (
            <Card
              style={{
                width: Dimensions.get('window').width - 20,
                height: 300,
              }}
            >
              {!loading && (
                <>
                  <CardItem>
                    <PieChart data={pieData} />
                  </CardItem>
                  <CardItem footer>
                    <Text>*Data from {dataEntries} entries</Text>
                  </CardItem>
                </>
              )}
              {loading && <Loading />}
            </Card>
          )}
        </View>
      </View>
    </View>
  );
};

export default MyData;
