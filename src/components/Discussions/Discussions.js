import React, { useEffect, useState, useRef } from 'react';
import { Container, Content, Icon, Fab } from 'native-base';
import { Text, Dimensions, Animated } from 'react-native';
import { DiscussionCard } from './DiscussionCard';
import Styles from './Discussions.styles';
import { getDiscussionPosts } from '../../api/DiscussionsApi';
import Loading from '../Loading';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

export const Discussions = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };
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

  useEffect(() => {
    fadeIn();
  }, []);

  const handleNavigation = (message) => {
    navigation.navigate('View Discussion', { message });
  };

  const handleScroll = (e, tabBarHeight) => {
    const windowHeight = Dimensions.get('window').height;
    const height = e.nativeEvent.contentSize.height;
    const offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height + tabBarHeight) {
      fadeOut();
    } else {
      fadeIn();
    }
  };
  return (
    <BottomTabBarHeightContext.Consumer>
      {(tabBarHeight) => (
        <Container style={Styles.container}>
          {!loading && data && (
            <Content onScroll={(e) => handleScroll(e, tabBarHeight)}>
              {data.map((message) => {
                const isAuthor = message.userId === currentUser;
                return (
                  <DiscussionCard
                    message={message}
                    handleNavigation={handleNavigation}
                    isAuthor={isAuthor}
                  />
                );
              })}
            </Content>
          )}
          {loading && <Loading />}
          {!loading && data.length === 0 && <Text>No Data</Text>}
          <Animated.View
            style={[
              Styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Fab
              onPress={() => navigation.navigate('Create Discussion')}
              style={{ backgroundColor: 'orchid' }}
            >
              <Icon name="pencil-outline" />
            </Fab>
          </Animated.View>
        </Container>
      )}
    </BottomTabBarHeightContext.Consumer>
  );
};
