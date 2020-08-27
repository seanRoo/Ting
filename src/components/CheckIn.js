import React from 'react';
import {
  Container,
  Header,
  Content,
  Picker,
  Form,
  List,
  ListItem,
  Left,
  Icon,
} from 'native-base';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Right} from './Right';

const CheckIn = ({route, navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        width: '100%',
      }}>
      <Container>
        <Content>
          <List>
            <ListItem style={{height: 60}}>
              <Text style={{fontSize: 18}}>What are you hearing?</Text>
              <Right>
                {
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Sound List')}>
                    <Icon name="chevron-forward-outline" />
                  </TouchableOpacity>
                }
              </Right>
            </ListItem>
            <ListItem style={{height: 60}}>
              <Text style={{fontSize: 18}}>How much sleep did you get?</Text>
              <Right>
                {
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Sleep List')}>
                    <Icon name="chevron-forward-outline" />
                  </TouchableOpacity>
                }
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    </View>
  );
};

export default CheckIn;
