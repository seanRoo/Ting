import React from 'react';
import { View, Text } from 'react-native';
import LineChartComponent from '../LineChart';

const DataDisplay = ({
  route: {
    params: { dataset, title, month, chips },
  },
}) => {
  const monthString = month.toLocaleString('default', { month: 'long' });
  const parsedChips = chips ? JSON.parse(chips) : [];

  if (dataset) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ justifyContent: 'flex-start', padding: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>
            {monthString}, {month.getFullYear()}
          </Text>
          <Text style={{ fontSize: 20, color: 'grey' }}>{title}</Text>
          {parsedChips.length ? (
            <View
              style={{
                height: 120,
                width: '100%',
                backgroundColor: 'rgba(218,112,214,.1)',
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 6 }}>
                Relief you tried this month
              </Text>
              {parsedChips.map((element) => (
                <Text>{`\u2022 ${element.label}`}</Text>
              ))}
            </View>
          ) : null}
        </View>
        <LineChartComponent dataset={dataset} monthString={monthString} />
      </View>
    );
  }
  return null;
};

export default DataDisplay;
