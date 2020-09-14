import React from 'react';
import {CheckBox} from 'native-base';
import {Right} from '../Right';
import {Text, View} from 'react-native';
import {cloneDeep} from 'lodash';
import Styles from './SoundList.styles';

const SoundList = ({sounds, setSounds}) => {
  const handleNewSound = (name) => {
    let newSoundArray = cloneDeep(sounds);
    const clickedItem = newSoundArray.get(name);
    if (clickedItem.checked) {
      clickedItem.checked = false;
    } else {
      clickedItem.checked = true;
    }
    setSounds(newSoundArray);
  };
  return (
    <View>
      <Text style={Styles.header}>What are you hearing?</Text>
      <View style={Styles.listContainer}>
        <View style={Styles.listRow}>
          {Array.from(sounds).map((sound, index) => {
            if (index < 4) {
              return (
                <View style={Styles.listItem}>
                  <Text>{sound[1].name}</Text>
                  <Right>
                    <CheckBox
                      style={Styles.checkbox}
                      color="orchid"
                      checked={sound[1].checked}
                      onPress={() => {
                        handleNewSound(sound[0]);
                      }}
                    />
                  </Right>
                </View>
              );
            }
          })}
        </View>
        <View style={Styles.divider} />
        <View style={Styles.listRow}>
          {Array.from(sounds).map((sound, index) => {
            if (index >= 4) {
              return (
                <View style={Styles.listItem}>
                  <Text>{sound[1].name}</Text>
                  <Right>
                    <CheckBox
                      style={Styles.checkbox}
                      color="orchid"
                      checked={sound[1].checked}
                      onPress={() => {
                        handleNewSound(sound[0]);
                      }}
                    />
                  </Right>
                </View>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

export default SoundList;
