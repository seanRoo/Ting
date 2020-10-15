import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartComponent = ({ height, width, data }) => {
  return (
    <View style={{ alignSelf: 'center' }}>
      <LineChart
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
      />
    </View>
  );
};

export default LineChartComponent;
