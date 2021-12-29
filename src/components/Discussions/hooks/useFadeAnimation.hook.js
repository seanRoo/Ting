import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const useFadeAnimation = () => {
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
  return { fadeIn, fadeOut, fadeAnim, handleScroll };
};

export default useFadeAnimation;
