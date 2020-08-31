import React, {useState} from 'react';
import {Container, Content, List, ListItem, Left, Icon} from 'native-base';
import {sleepArray} from '../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {Right} from './Right';

const SleepList = () => {
  const [sleep, setSleep] = useState(sleepArray);
  const handleNewSleep = (newSleep) => {
    let newSleepArray = Array.from(sleep);
    newSleepArray.map((element) => {
      if (element.name === newSleep.name && !element.checked) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
    setSleep(newSleepArray);
  };
  return (
    <Container>
      <Content>
        <List>
          {sleepArray.map((sleep) => {
            return (
              <TouchableOpacity onPress={() => handleNewSleep(sleep)}>
                <ListItem style={{height: 60}}>
                  <Left>
                    <Text style={{fontSize: 18}}>{sleep.name}</Text>
                  </Left>
                  <Right>
                    {sleep.checked && (
                      <Icon style={{color: 'green'}} name="checkmark-outline" />
                    )}
                  </Right>
                </ListItem>
              </TouchableOpacity>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default SleepList;
