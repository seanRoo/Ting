import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PureChart from 'react-native-pure-chart';

const tenRandomEntries = () => [
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
  { x: 'foo', y: Math.round(Math.random() * 100) },
];

const LineChartComponent = ({ height, width, data }) => {
  let sampleData = [
    {
      seriesName: 'series1',
      data: data
        ? data?.map((element) => ({
            y: element?.sliderValues?.sleepHours,
            x: element.date,
          }))
        : tenRandomEntries(),

      color: '#297AB1',
    },
  ];

  return (
    // <View
    //   style={{
    //     alignSelf: 'center',
    //     width: width,
    //     marginLeft: 0,
    //     paddingLeft: 0,
    //     borderRadius: 16,
    //   }}
    // >
    <PureChart height={height} width={width} data={sampleData} type="line" />

    /* <LineChart
        onDataPointClick={(event) => console.log(event)}
        data={{
          labels: [],
          datasets: [
            {
              data: data?.map((element) => element.sleepHours) || [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: () => 'blue',
            },
            {
              data: data?.map((element) => element.stressLevel) || [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: () => 'green',
            },
          ],
          legend: ['Sleep (hrs)', 'Stress (lvl)'],
        }}
        width={width || Dimensions.get('window').width - 50}
        height={height || 220}
        chartConfig={{
          //backgroundColor: '#e26a00',
          backgroundGradientFrom: 'orchid',
          backgroundGradientTo: 'black',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '2',
            strokeWidth: '1',
            stroke: '#ffa726',
          },
        }}
        bezier
      /> */
    // </View>
  );
};

export default LineChartComponent;
