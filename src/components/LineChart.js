import React from 'react';
import { Text, View } from 'react-native';
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';
import ActionButton from './ActionButton';
import { onShare } from './MyData/MyData.utils';

const LineChartComponent = ({ height, width, dataset }) => {
  return (
    <View
      style={{
        display: 'flex',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <ActionButton
          iconName="share-variant"
          text="Share"
          handleClick={onShare}
        />
        <ActionButton iconName="rotate-left" text="Rotate" />
      </View>
      <Chart
        style={{
          width: '100%',
          height: '95%',
        }}
        padding={{ bottom: 14, left: 15, top: 20, right: 4 }}
        xDomain={{ min: 0, max: 31 }}
        yDomain={{ min: 0, max: 12 }}
        viewport={{ size: { width: 12 } }}
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
        {dataset?.map((dataObject) => (
          <>
            {dataObject.toggled && (
              <Line
                tooltipComponent={<Tooltip />}
                theme={{
                  stroke: { color: dataObject.color, width: 3 },
                  scatter: { default: { width: 2, height: 4, rx: 2 } },
                }}
                data={dataObject.data}
              />
            )}
          </>
        ))}
      </Chart>
    </View>
  );
};

export default LineChartComponent;
