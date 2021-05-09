import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PureChart from 'react-native-pure-chart';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';

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
  return (
    <Chart
      style={{ height: height || 250, width: width || 380 }}
      padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
      xDomain={{ min: 0, max: 31 }}
      yDomain={{ min: 0, max: 12 }}
      viewport={{ size: { width: 10 } }}
    >
      <VerticalAxis
        tickValues={('' + Array(12)).split(',').map(
          function () {
            return this[0]++;
          },
          [1],
        )}
      />
      <HorizontalAxis
        tickValues={('' + Array(31)).split(',').map(
          function () {
            return this[0]++;
          },
          [1],
        )}
      />
      {/* <Area
        theme={{
          gradient: {
            from: { color: 'orchid' },
            to: { color: 'white', opacity: 0.4 },
          },
        }}
      /> */}
      <Line
        tooltipComponent={<Tooltip />}
        theme={{
          stroke: { color: 'orchid', width: 5 },
          scatter: { default: { width: 4, height: 4, rx: 2 } },
        }}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 6 },
          { x: 3, y: 2 },
          { x: 4, y: 8 },
          { x: 10, y: 10 },
          { x: 17, y: 2 },
          { x: 23, y: 5 },
        ]}
      />
      <Line
        tooltipComponent={<Tooltip />}
        theme={{
          stroke: { color: 'green', width: 5 },
          scatter: { default: { width: 4, height: 4, rx: 2 } },
        }}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 2 },
          { x: 5, y: 4 },
          { x: 8, y: 9 },
          { x: 12, y: 5 },
          { x: 26, y: 2 },
        ]}
      />
    </Chart>
  );
};

export default LineChartComponent;
