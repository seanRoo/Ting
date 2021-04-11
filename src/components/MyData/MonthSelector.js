import React from 'react';
import { Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Right } from '../Right';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { monthsArray } from './MyData.utils';
import { CardItem, Left } from 'native-base';
import { normalize } from '../Discussions/Discussion.utils';

const MonthSelector = ({
  disabledArrows,
  handleMonthUpdate,
  monthsArrayIndex,
}) => {
  return (
    <CardItem
      header
      style={{
        justifyContent: 'center',
        borderRadius: 16,
      }}
    >
      <Left>
        <TouchableOpacity
          disabled={disabledArrows.leftArrow}
          onPress={() => handleMonthUpdate(-1)}
        >
          <Entypo
            name="triangle-left"
            size={25}
            color={disabledArrows.leftArrow ? '#EBEBE4' : 'black'}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 12,
              padding: 5,
            }}
          />
        </TouchableOpacity>
      </Left>
      <Text
        style={{
          fontSize: normalize(14),
          fontWeight: 'bold',
        }}
      >
        {monthsArray[monthsArrayIndex]}
      </Text>
      <Right>
        <TouchableOpacity
          disabled={disabledArrows.rightArrow}
          onPress={() => handleMonthUpdate(1)}
        >
          <Entypo
            name="triangle-right"
            size={25}
            color={disabledArrows.rightArrow ? '#EBEBE4' : 'black'}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 12,
              padding: 5,
            }}
          />
        </TouchableOpacity>
      </Right>
    </CardItem>
  );
};

export default MonthSelector;
