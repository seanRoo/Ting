import React from 'react';
import { MenuOption } from 'react-native-popup-menu';
import { Left, Right, Icon } from 'native-base';
import { Text } from 'react-native';
import MyDataStyles from './MyData.styles';

const DropdownMenuOption = ({ setGraphView, text, value, graphView }) => {
  return (
    <MenuOption
      style={MyDataStyles.menuOption}
      onSelect={() => setGraphView(value)}
    >
      <Left style={{ alignSelf: 'flex-start' }}>
        <Text numberOfLines={1} style={{ fontSize: 20, width: 100 }}>
          {text}
        </Text>
      </Left>
      {graphView === value && (
        <Right>
          <Icon style={{ fontSize: 25 }} name="checkmark" />
        </Right>
      )}
    </MenuOption>
  );
};

export default DropdownMenuOption;
