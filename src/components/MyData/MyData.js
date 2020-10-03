import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Segment, Card, CardItem} from 'native-base';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import GraphViewDropdown from './GraphViewDropdown';
import MyDataStyles from './MyData.styles';

const MyData = () => {
  const [buttonState, setButtonState] = useState({
    week: true,
    month: false,
    year: false,
  });
  const [graphView, setGraphView] = useState('pie');

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
          style={MyDataStyles.buttons}>
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
          style={MyDataStyles.buttons}>
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
          style={MyDataStyles.buttons}>
          <Text>Year</Text>
        </Button>
      </Segment>
      <View style={MyDataStyles.graphContainer}>
        <View style={MyDataStyles.graphViewDropdown}>
          <Text style={{fontSize: 20}}>Graph View</Text>
          <GraphViewDropdown
            setGraphView={setGraphView}
            graphView={graphView}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          {graphView === 'line' && <LineChart height={350} />}
          {graphView === 'pie' && (
            <Card>
              <CardItem>
                <PieChart />
              </CardItem>
            </Card>
          )}
        </View>
      </View>
    </View>
  );
};

export default MyData;
