import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';

import Layout from '../../../components/Layout';
import BackButton from '../../../components/BackButton';
import EntryItem from '../EntryItem';
import Stats from './Stats1';

import { dateDisplay } from '../../../core/utils';
import { ratingReps } from '../../../core/constants';
import { getMoodsBySymptomOnDay } from '../../../api/database';
import { theme } from '../../../core/theme';

const screenWidth = Dimensions.get('window').width;

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const EntryScreen = ({ route: { params: item }, navigation }) => {
  const average = Math.round(item.rating);
  const [moods, setMoods] = useState([]);
  const [titleWidth, setTitleWidth] = useState(0);
  const [headerWidth, setHeaderWidth] = useState(0);

  useEffect(() => {
    async function fetchMoods() {
      const moodData = await getMoodsBySymptomOnDay(item.symptomName, item.id);
      setMoods(moodData);
    }
    fetchMoods();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;
  // change header title size from 1 to 0.9
  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });
  // change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -165],
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
    <Layout>
      <BackButton onPress={() => navigation.goBack()} />
      <Animated.View
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
            {dateDisplay(item.date)}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.textWrapper,
            {
              transform: [{ translateX: headerTranslateX }],
            },
          ]}>
          <Text
            style={styles.heading}
            onLayout={(e) => {
              if (headerWidth === 0) {
                console.log(e.nativeEvent.layout.width);
                setHeaderWidth(e.nativeEvent.layout.width);
              }
            }}>
            {item.symptomName}
          </Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.container}>
        {moods && moods.length > 0 && (
          <>
            {/* <Stats moods={moods} /> */}
            {/* {moods.map((mood) => (
              <EntryItem item={mood} key={mood.timestamp} />
            ))} */}

            <Animated.FlatList
              data={moods}
              ListHeaderComponent={() => (
                <>
                  <Text style={styles.emoji}>
                    Overall: {ratingReps[average - 1]}
                  </Text>
                  <Stats moods={moods} />
                </>
              )}
              renderItem={({ item: moodEntry }) => (
                <EntryItem item={moodEntry} key={item.timestamp} />
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
                { useNativeDriver: true }, // use native driver for animation
              )}
            />
          </>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 85,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  textWrapper: {
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 0,
    marginTop: HEADER_MIN_HEIGHT,
  },
  flatList: {
    paddingTop: 100,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    width: '0%',
  },
  emoji: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  heading: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  notesText: {
    color: '#ffffff',
    fontSize: 16,
  },
  textContainer: {
    paddingVertical: 0,
  },
});

export default EntryScreen;
