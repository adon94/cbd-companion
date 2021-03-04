import React, { useState } from 'react';
import { StyleSheet, Text, Dimensions, Animated } from 'react-native';

import Header from './Header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

console.log(screenHeight);

const HEADER_MAX_HEIGHT = 210;
const HEADER_MIN_HEIGHT = screenHeight / 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ScrollHeader = ({ scrollY, title, header }) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerY, setContainerY] = useState(0);
  const [titleWidth, setTitleWidth] = useState(0);
  const [headerWidth, setHeaderWidth] = useState(0);
  console.log('containerHeight', containerHeight);
  console.log('containerY', containerY);

  // const scrollY = useRef(new Animated.Value(0)).current;
  // change header title size from 1 to 0.9
  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });
  // change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -containerY],
    extrapolate: 'clamp',
  });
  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, (screenWidth - titleWidth - 40) / 2],
    extrapolate: 'clamp',
  });
  const headerTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, (screenWidth - headerWidth - 40) / 2],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      onLayout={(e) => {
        if (containerHeight === 0) {
          console.log('y', e.nativeEvent.layout.y);
          setContainerHeight(e.nativeEvent.layout.height);
          setContainerY(e.nativeEvent.layout.y);
        }
      }}
      style={[
        styles.headerContainer,
        {
          transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
        },
      ]}>
      <Animated.View
        style={[
          styles.textWrapper,
          {
            transform: [{ translateX: titleTranslateX }],
          },
        ]}>
        <Text
          style={styles.title}
          onLayout={(e) => {
            if (titleWidth === 0) {
              console.log(e.nativeEvent.layout.width);
              setTitleWidth(e.nativeEvent.layout.width);
            }
          }}>
          {title}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.textWrapper,
          {
            transform: [{ translateX: headerTranslateX }],
          },
        ]}>
        <Header
          onLayout={(e) => {
            console.log('widh', e.nativeEvent.layout.width);
            if (headerWidth === 0) {
              setHeaderWidth(e.nativeEvent.layout.width);
            }
          }}>
          {header}
        </Header>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: HEADER_MIN_HEIGHT + 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    // height: HEADER_MAX_HEIGHT,
  },
  textWrapper: {
    alignSelf: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    width: '0%',
    // marginTop: 30,
  },
});

export default ScrollHeader;
