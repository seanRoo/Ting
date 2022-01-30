import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScoreDifferenceIcon = ({
  hasImprovedFromLastMonth,
  scoreArray,
  lastMonthScoreArray,
  filterIndex,
  highValueIsGood,
  styleProps,
}) => {
  return (
    (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 8,
          borderColor: 'grey',
          paddingTop: 0,
          ...styleProps,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name={
              lastMonthScoreArray?.[filterIndex] - scoreArray[filterIndex] < 0
                ? 'arrow-up'
                : 'arrow-down'
            }
            color={
              hasImprovedFromLastMonth && highValueIsGood ? 'green' : 'red'
            }
            size={28}
          />
          <Text
            style={{
              fontSize: 24,
              color: !(hasImprovedFromLastMonth && highValueIsGood)
                ? 'red'
                : 'green',
            }}
          >
            {Math.abs(
              lastMonthScoreArray?.[filterIndex] - scoreArray[filterIndex] ||
                scoreArray[filterIndex],
            )}
            %
          </Text>
        </View>
        <Text
          style={{
            color: 'grey',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 12,
          }}
        >
          Compared to last month
        </Text>
        {/* <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 25,
      }}
    /> */}
      </View>
    ) || null
  );
};

export default ScoreDifferenceIcon;
