import React, {useState} from 'react';
import {soundsArray} from '../utils';
import {Container, Content, List, ListItem, Left, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Right} from './Right';
import {Text} from 'react-native';

const SoundList = () => {
  const [sounds, setSounds] = useState(soundsArray);
  const handleNewSound = (newSound) => {
    let newSoundArray = Array.from(sounds);
    newSoundArray.map((element) => {
      if (element.name === newSound.name && !element.checked) {
        element.checked = true;
      } else if (element.name === newSound.name && element.checked) {
        element.checked = false;
      }
    });
    setSounds(newSoundArray);
  };
  return (
    <Container>
      <Content>
        <List>
          {soundsArray.map((sound) => {
            return (
              <TouchableOpacity onPress={() => handleNewSound(sound)}>
                <ListItem style={{height: 60}}>
                  <Left>
                    <Text style={{fontSize: 18}}>{sound.name}</Text>
                  </Left>
                  <Right>
                    {sound.checked && (
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

export default SoundList;
