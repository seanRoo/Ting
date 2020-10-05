import React from 'react';
import { CheckBox } from 'native-base';
import { Right } from '../Right';
import { Text, View } from 'react-native';
import { cloneDeep } from 'lodash';
import Styles from './SoundList.styles';

const SoundList = ({ sounds, setSounds }) => {
  const handleNewSound = (soundObject) => {
    let newSoundArray = cloneDeep(sounds);
    const clickedItem = newSoundArray.find(
      (elementArray) => elementArray.name === soundObject.name,
    );
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
          {sounds.map((sound, index) => {
            if (index < 4) {
              return (
                <View style={Styles.listItem}>
                  <Text>{sound.name}</Text>
                  <Right>
                    <CheckBox
                      style={Styles.checkbox}
                      color="orchid"
                      checked={sound.checked}
                      onPress={() => {
                        handleNewSound(sound);
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
          {sounds.map((sound, index) => {
            if (index >= 4) {
              return (
                <View style={Styles.listItem}>
                  <Text>{sound.name}</Text>
                  <Right>
                    <CheckBox
                      style={Styles.checkbox}
                      color="orchid"
                      checked={sound.checked}
                      onPress={() => {
                        handleNewSound(sound);
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
