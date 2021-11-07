import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { DiscussionCard } from './DiscussionCard';
import Styles from './Discussions.styles';
import { getDiscussionPosts } from '../../api/DiscussionsApi';
import Loading from '../Loading';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    console.log('fired');
    if (!data) {
      getDiscussionPosts(setData);
    }
    if (data) {
      // setData(data.sort((a, b) => a - b);
      setDisplayData([...data]);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    navigation.setParams({ handleFilterChange });
    fadeIn();
  }, [displayData, handleFilterChange]);

  const isAscending = (arr) => {
    return arr.every(function (x, i) {
      return i === 0 || x.date >= arr[i - 1].date;
    });
  };

  const isDescending = (arr) => {
    return arr.every(function (x, i) {
      return i === 0 || x.date <= arr[i - 1].date;
    });
  };

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

  useEffect(() => {}, [displayData]);

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
                  const isAuthor = message.userId === currentUser;
                  return (
                    <DiscussionCard
                      message={message}
                      handleNavigation={handleNavigation}
                      isAuthor={isAuthor}
                    />
                  );
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
