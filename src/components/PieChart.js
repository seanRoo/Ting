import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// const data = [
//   {
//     name: 'Buzzing',
//     population: 25,
//     color: 'orchid',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Hissing',
//     population: 10,
//     color: 'blue',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Ringing',
//     population: 20,
//     color: 'red',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Hum',
//     population: 20,
//     color: 'green',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Music',
//     population: 15,
//     color: 'yellow',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Whistle',
//     population: 4,
//     color: 'orange',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Pulsating',
//     population: 5,
//     color: 'grey',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Other',
//     population: 1,
//     color: 'black',
//     legendFontColor: 'black',
//     legendFontSize: 15,
//   },
// ];

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

// let sampleData = [
//   {
//     value: 50,
//     label: 'Marketing',
//     color: 'red',
//   },
//   {
//     value: 40,
//     label: 'Sales',
//     color: 'blue',
//   },
//   {
//     value: 25,
//     label: 'Support',
//     color: 'green',
//   },
// ];

const PieChartComponent = ({ height, width, countArray }) => {
  return (
    <>
      <PieChart
        data={data}
        width={400}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={15}
      />
    </>
  );
};

export default PieChartComponent;
