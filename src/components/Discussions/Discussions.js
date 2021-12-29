import React, { useEffect, useState } from 'react';
import { Text, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { DiscussionCard } from './DiscussionCard';
import Styles from './Discussions.styles';
import { getDiscussionPosts } from '../../api/DiscussionsApi';
import Loading from '../Loading';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useFadeAnimation from './hooks/useFadeAnimation.hook';
import { isDescending, isAscending } from './Discussion.utils';

export const Discussions = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const { fadeIn, fadeAnim, handleScroll } = useFadeAnimation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    if (!data) {
      getDiscussionPosts(setData);
    }
    if (data) {
      setDisplayData([...data]);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    navigation.setParams({ handleFilterChange });
    fadeIn();
  }, [displayData, handleFilterChange]);

  const handleFilterChange = () => {
    let newData = [...displayData];
    if (newData?.length > 1) {
      if (isAscending(newData)) {
        newData.sort((a, b) => b.date - a.date);
      } else if (isDescending(newData)) {
        newData.sort((a, b) => a.date - b.date);
      }
      setDisplayData(newData);
    }
  };

  const handleNavigation = (message) => {
    navigation.navigate('View Discussion', { message });
  };

  return (
    <BottomTabBarHeightContext.Consumer>
      {(tabBarHeight) => (
        <>
          <ScrollView
            style={Styles.container}
            onScroll={(e) => handleScroll(e, tabBarHeight)}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            {!loading && displayData && (
              <>
                {displayData.map((message) => {
                  if (message.firstName && message.lastName && message.userId) {
                    const isAuthor = message.userId === currentUser;
                    return (
                      <DiscussionCard
                        message={message}
                        handleNavigation={handleNavigation}
                        isAuthor={isAuthor}
                      />
                    );
                  }
                })}
              </>
            )}
            {loading && <Loading />}
            {!loading && displayData?.length === 0 && <Text>No Data</Text>}
          </ScrollView>
          <Animated.View
            style={{
              opacity: fadeAnim,
              height: 80,
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}
          >
            <TouchableOpacity
              style={{
                width: 65,
                height: 65,
                borderRadius: 32.5,
                alignSelf: 'flex-end',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orchid',
              }}
              onPress={() => navigation.navigate('Create Discussion')}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </BottomTabBarHeightContext.Consumer>
  );
};
