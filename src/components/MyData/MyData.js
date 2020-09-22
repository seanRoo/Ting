import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Center} from '../Center';
import {Button, Segment} from 'native-base';
import LineChart from '../LineChart';
const MyData = () => {
  const [buttonState, setButtonState] = useState({
    primary: true,
    secondary: false,
  });
  return (
    <View style={MyDataStyles.container}>
      <Segment style={MyDataStyles.buttonContainer}>
        <Button
          onPress={() =>
            setButtonState({
              primary: true,
              secondary: false,
            })
          }
          active={buttonState.primary}
          first
          style={MyDataStyles.buttons}>
          <Text>Primary</Text>
        </Button>
        <Button
          onPress={() =>
            setButtonState({
              primary: false,
              secondary: true,
            })
          }
          active={buttonState.secondary}
          last
          style={MyDataStyles.buttons}>
          <Text>Success</Text>
        </Button>
      </Segment>
      <View style={MyDataStyles.graphContainer}>
        <LineChart height={350} width={350} />
      </View>
    </View>
  );
};

const MyDataStyles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', marginTop: 20},
  buttonContainer: {
    marginBottom: 30,
  },
  buttons: {
    height: 35,
    padding: 20,
  },
  graphContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default MyData;
