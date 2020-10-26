import React from 'react';
import { View } from 'native-base';
import { TextInput, Keyboard, Platform } from 'react-native';

export const CreateDiscussion = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
      <View
        style={{
          marginLeft: 12,
          marginTop: 16,
        }}
      >
        <TextInput
          autoFocus={true}
          placeholder="Start a Discussion..."
          style={{ fontSize: 25 }}
          onKeyPress={({ nativeEvent }) => {
            console.log(nativeEvent);
          }}
          multiline={true}
        />
      </View>
    </View>
  );
};
