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
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'grey',
          paddingTop: 0,
          height: '100%',
          ...styleProps,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
              fontSize: 22,
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
            fontSize: 14,
            width: '90%',
          }}
        >
          From last month
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
