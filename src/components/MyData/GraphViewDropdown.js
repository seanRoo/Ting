import React from 'react';
import {Text} from 'react-native';
import {Left} from 'native-base';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Right} from '../Right';
import MyDataStyles from './MyData.styles';
import MenuOption from './MenuOption';

const charts = [
  {
    text: 'Pie Chart',
    value: 'pie',
  },
  {
    text: 'Line Chart',
    value: 'line',
  },
  {
    text: 'Bar Chart',
    value: 'bar',
  },
];
const GraphViewDropdown = ({graphView, setGraphView}) => {
  return (
    <Menu
      style={{
        flexDirection: 'row',
        marginTop: 4,
      }}>
      <MenuTrigger
        style={{flexDirection: 'row'}}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerTouchable: {
            style: {
              height: 45,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              padding: 10,
              width: 120,
              borderRadius: 8,
            },
          },
          triggerWrapper: {
            width: '100%',
          },
        }}>
        <Text style={{fontSize: 18}}>{graphView}</Text>
        <Right>
          <Icon style={{fontSize: 25}} name="caret-down" />
        </Right>
      </MenuTrigger>
      <MenuOptions>
        {charts.map((chart) => {
          return (
            <MenuOption
              setGraphView={setGraphView}
              text={chart.text}
              value={chart.value}
              graphView={graphView}
            />
          );
        })}
      </MenuOptions>
    </Menu>
  );
};

export default GraphViewDropdown;
