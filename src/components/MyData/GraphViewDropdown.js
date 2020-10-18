import React from 'react';
import { Text, View } from 'react-native';
import { Left } from 'native-base';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Right } from '../Right';
import MyDataStyles from './MyData.styles';
import MenuOption from './MenuOption';
import { charts } from './MyData.utils';

const GraphViewDropdown = ({ graphView, setGraphView, customStyles }) => {
  return (
    <View style={{ ...MyDataStyles.graphViewDropdown, ...customStyles }}>
      <Text style={{ fontSize: 20 }}>Graph View</Text>
      <Menu
        style={{
          flexDirection: 'row',
          marginTop: 4,
        }}
      >
        <MenuTrigger
          style={{ flexDirection: 'row' }}
          customStyles={{
            TriggerTouchableComponent: TouchableOpacity,
            triggerTouchable: {
              style: {
                height: 45,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                padding: 10,
                width: 170,
                borderRadius: 8,
              },
            },
            triggerWrapper: {
              width: '100%',
            },
          }}
        >
          <Text style={{ fontSize: 18 }}>{graphView.text}</Text>
          <Right>
            <Icon style={{ fontSize: 25 }} name="caret-down" />
          </Right>
        </MenuTrigger>
        <MenuOptions>
          {charts.map((chart) => {
            return (
              <MenuOption
                setGraphView={setGraphView}
                text={chart.text}
                chart={chart}
                graphView={graphView}
              />
            );
          })}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default GraphViewDropdown;
