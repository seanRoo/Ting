import React from 'react';
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';

const LineChartComponent = ({ height, width, dataset }) => {
  return (
    <>
      {dataset && (
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
          {dataset.map((dataObject) => (
            <Line
              tooltipComponent={<Tooltip />}
              theme={{
                stroke: { color: dataObject.color, width: 2 },
                scatter: { default: { width: 2, height: 4, rx: 2 } },
              }}
              data={dataObject.data}
              smoothing="cubic-spline"
            />
          ))}
        </Chart>
      )}
    </>
  );
};

export default LineChartComponent;
