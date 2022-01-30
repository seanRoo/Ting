import React, { useState } from 'react';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text, Svg } from 'react-native-svg';

const LineChartComponent = ({ height, width, dataset, monthString }) => {
  const data = dataset?.map((element) => element.y);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);

  const Points = (props) => {
    const { data, y, x } = props;
    return data?.map((point, index) => {
      return (
        <G x={x(index) - 75 / 2} height="80" width="80" fill="black">
          <Circle
            opacity={'0'}
            x={75 / 2}
            cy={y(data[index])}
            r={34}
            onPress={() => setCurrentDataIndex(index)}
            onResponderMove={() => null}
          />
          <Circle
            x={75 / 2}
            cy={y(data[index])}
            r={10}
            stroke={'orchid'}
            strokeWidth={2}
            fill="white"
            onPress={() => setCurrentDataIndex(index)}
            onResponderMove={() => null}
          />
        </G>
      );
    });
  };
  const Tooltip = (props) => {
    const { x, y } = props;
    return (
      <G x={x(currentDataIndex) - 78 / 2} key={'tooltip'}>
        <G y={y(data[currentDataIndex] - 0.25)}>
          <Rect
            height={60}
            width={78}
            stroke={'grey'}
            fill={'white'}
            ry={10}
            rx={10}
          />
          <Text
            x={78 / 2}
            dy={20}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
            stroke={'rgb(134, 65, 244)'}
          >
            {`${data[currentDataIndex]} / 10`}
          </Text>
          <Text
            x={78 / 2}
            dy={40}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
            stroke={'rgb(134, 65, 244)'}
          >
            {`${dataset[currentDataIndex].x} ${monthString}`}
          </Text>
        </G>
        <G x={78 / 2}>
          <Line
            y1={y(data[currentDataIndex] - 0.25)}
            y2={y(data[currentDataIndex])}
            stroke={'grey'}
            strokeWidth={2}
          />
          <Circle
            cy={y(data[currentDataIndex])}
            r={6}
            stroke={'rgb(134, 65, 244)'}
            strokeWidth={2}
            fill={'white'}
          />
        </G>
      </G>
    );
  };

  const axesSvg = { fontSize: 14, fill: 'grey' };
  const verticalContentInset = { top: 20, bottom: 120 };

  console.log(data);
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <YAxis
        data={data}
        style={{ marginLeft: 10, marginRight: 5, height: '95%' }}
        contentInset={verticalContentInset}
        svg={axesSvg}
      />
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LineChart
          style={{ width: 500, height: '95%' }}
          data={data}
          height="600"
          svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 120, left: 40, right: 40 }}
          numberOfTicks={6}
        >
          <Points />
          <Grid />
          <Tooltip />
        </LineChart>
      </ScrollView>
    </View>
  );
};

export default LineChartComponent;
