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

const PieChartComponent = ({ height, width, countArray, data }) => {
  return (
    <>
      {data && (
        <PieChart
          data={data}
          width={width || Dimensions.get('window').width - 20}
          height={height || 220}
          chartConfig={chartConfig}
          accessor="percentage"
          //paddingLeft="15"
        />
      )}
    </>
  );
};

export default PieChartComponent;
