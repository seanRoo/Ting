import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGuage from './LinearGuage';
import ScoreDifferenceIcon from './ScoreDifferenceIcon';

const DataDisplayBox = ({
  scoreArray,
  filterIndex,
  labels,
  hasImprovedFromLastMonth,
  lastMonthScoreArray,
  handleDataNavigate,
  highValueIsGood,
}) => {
  const getScoreColour = () => {
    const score = scoreArray[filterIndex];
    if (highValueIsGood) {
      return score <= 30
        ? 'rgba(255,122,122,.3)'
        : score > 30 && score < 70
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

  const noLastMonthData = lastMonthScoreArray.every((element) => !element);
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
            {scoreArray[filterIndex]}% average
          </Text>
          <Text style={{ fontSize: 16, color: 'grey' }}>
            {labels[filterIndex]?.label}
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
          value={scoreArray[filterIndex]}
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
        <View style={{ flex: 0.45 }}>
          {!noLastMonthData && (
            <ScoreDifferenceIcon
              hasImprovedFromLastMonth={hasImprovedFromLastMonth}
              scoreArray={scoreArray}
              lastMonthScoreArray={lastMonthScoreArray}
              filterIndex={filterIndex}
              highValueIsGood={highValueIsGood}
            />
          )}
        </View>
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
          <TouchableOpacity onPress={handleDataNavigate}>
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
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DataDisplayBox;
