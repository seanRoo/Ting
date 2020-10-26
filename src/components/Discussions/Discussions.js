import React from 'react';
import {
  Card,
  CardItem,
  Body,
  Container,
  Content,
  Icon,
  Fab,
} from 'native-base';
import { Text, View } from 'react-native';
import Styles from './Discussions.styles';

export const Discussions = ({ navigation }) => {
  return (
    <Container style={Styles.container}>
      <Content>
        <Card style={{ width: '95%', alignSelf: 'center' }}>
          <CardItem header>
            <Text style={Styles.heading}>
              This is a test heading for a test discussion
            </Text>
          </CardItem>
          <CardItem>
            <Body style={Styles.cardBody}>
              <Text style={Styles.bodyText} numberOfLines={3}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Text>
            </Body>
          </CardItem>
          <CardItem footer style={Styles.footer}>
            <View style={{ flexDirection: 'row', marginRight: 12 }}>
              <Icon
                name="chatbox-sharp"
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}
              />
              <Text>10</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 14 }}>
              <Icon
                name="md-arrow-up"
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                }}
              />
              <Text>20</Text>
            </View>
          </CardItem>
        </Card>
      </Content>
      <Fab onPress={() => navigation.push('Create Discussion')}>
        <Icon name="pencil-outline" />
      </Fab>
    </Container>
  );
};
