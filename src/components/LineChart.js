import React from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const LineChartComponent = ({height, width}) => {
  return (
    <View style={{alignSelf: 'center'}}>
      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [
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
            },
          ],
        }}
        width={width || Dimensions.get('window').width - 20}
        height={height || 220}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          //backgroundColor: '#e26a00',
          backgroundGradientFrom: 'orchid',
          backgroundGradientTo: 'black',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
      />
    </View>
  );
};

export default LineChartComponent;
