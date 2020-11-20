import React, { useEffect, useState } from 'react';
import {
  Card,
  CardItem,
  Body,
  Container,
  Content,
  Icon,
  Fab,
} from 'native-base';
import { Text, View, TouchableOpacity } from 'react-native';
import Styles from './Discussions.styles';
import { getDiscussionPosts } from '../../api/DiscussionsApi';
import Loading from '../Loading';
import { Avatar } from 'react-native-elements';

export const Discussions = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!data) {
      getDiscussionPosts(setData);
    }
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <Container style={Styles.container}>
      {!loading && data && (
        <Content>
          {data.map((element) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('View Discussion', { element })
                }
              >
                <Card style={Styles.discussionCard}>
                  <View style={{ flexDirection: 'row', margin: 14 }}>
                    <Avatar
                      size="medium"
                      rounded
                      title="SR"
                      onPress={() => console.log('Works!')}
                      activeOpacity={0.1}
                      containerStyle={{ backgroundColor: 'black' }}
                    />
                    <Text style={{ marginLeft: 10, marginTop: 14 }}>
                      {element.firstName} {element.lastName}
                    </Text>
                  </View>
                  <CardItem header>
                    <Text style={Styles.heading}>{element.messageHeader}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={Styles.bodyText} numberOfLines={3}>
                        {element.messageBody}
                      </Text>
                    </Body>
                  </CardItem>

                  <CardItem bordered footer style={Styles.footer}>
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
              </TouchableOpacity>
            );
          })}
        </Content>
      )}
      {loading && <Loading />}
      {!loading && data.length === 0 && <Text>No Data</Text>}
      <Fab
        onPress={() => navigation.navigate('Create Discussion')}
        style={{ backgroundColor: 'orchid' }}
      >
        <Icon name="pencil-outline" />
      </Fab>
    </Container>
  );
};
