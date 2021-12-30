import React from 'react';
import { View, Text } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGuage from './LinearGuage';
import ScoreDifferenceIcon from './ScoreDifferenceIcon';

const DataDisplayBox = ({
  scoreArray,
  currentButtonIndex,
  labels,
  hasImprovedFromLastMonth,
  lastMonthScoreArray,
}) => {
  const highValueIsGood =
    labels[currentButtonIndex] === 'Sleep' ||
    labels[currentButtonIndex] === 'Mood';

  const getScoreColour = () => {
    const score = scoreArray[currentButtonIndex];
    if (highValueIsGood) {
      return score <= 35
        ? 'rgba(255,122,122,.3)'
        : score > 35 && score < 70
        ? 'rgba(255,215,0, .5)'
        : 'rgba(152, 251, 152,.3)';
    } else {
      return score <= 35
        ? 'rgba(152, 251, 152,.3)'
        : score > 35 && score < 70
        ? 'rgba(255,215,0, .5)'
        : 'rgba(255,122,122,.3)';
    }
  };

  return (
    <View
      style={{
        flex: 0.85,
        flexDirection: 'row',
        padding: 8,
        borderRadius: 10,
        backgroundColor: getScoreColour(),
      }}
    >
      <View
        style={{
          flex: 0.7,
        }}
      >
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {scoreArray[currentButtonIndex]}% average
          </Text>
          <Text style={{ fontSize: 16, color: 'grey' }}>
            {labels[currentButtonIndex]}
          </Text>
        </View>
        <LinearGuage
          startLabel="Low"
          endLabel="High"
          style={{
            justifyContent: 'center',
            marginTop: 30,
            width: '95%',
          }}
          value={scoreArray[currentButtonIndex]}
          highValueIsGood={highValueIsGood}
        />
      </View>
      <View
        style={{
          flex: 0.3,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <ScoreDifferenceIcon
          styleProps={{ flex: 0.45 }}
          hasImprovedFromLastMonth={hasImprovedFromLastMonth}
          scoreArray={scoreArray}
          lastMonthScoreArray={lastMonthScoreArray}
          currentButtonIndex={currentButtonIndex}
        />
        <View
          style={{
            width: '90%',
            height: 1,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            flex: 0.45,
          }}
        >
          <SimpleLineIcons name="graph" size={35} />
          <Text
            style={{
              fontSize: 16,
              color: 'blue',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}
          >
            See data
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DataDisplayBox;
