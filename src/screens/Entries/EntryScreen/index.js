import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import Layout from '../../../components/Layout';
import BackButton from '../../../components/BackButton';
import EntryItem from '../EntryItem';
import Stats from './Stats1';

import { dateDisplay } from '../../../core/utils';
import { ratingReps } from '../../../core/constants';
import { getMoodsBySymptomOnDay } from '../../../api/database';
import { theme } from '../../../core/theme';
import ScrollHeader from '../../../components/ScrollHeader';
import RatingButton from '../../../components/RatingButton';

const HEADER_MIN_HEIGHT = 80;

const EntryScreen = ({ route: { params: item }, navigation }) => {
  const average = Math.round(item.rating);
  const [moods, setMoods] = useState([]);
  const [factors, setFactors] = useState([]);

  useEffect(() => {
    async function fetchMoods() {
      const moodData = await getMoodsBySymptomOnDay(item.symptomName, item.id);
      setMoods(moodData.moods);
      const factorList = [];
      Object.keys(moodData.dayInfo).forEach((key) => {
        if (key !== 'rating' && key !== 'date') {
          factorList.push({ displayName: key, value: moodData.dayInfo[key] });
        }
      });
      setFactors(factorList);
    }
    fetchMoods();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Layout>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollHeader
        scrollY={scrollY}
        header={item.symptomName}
        title={dateDisplay(item.date)}
      />
      <View style={styles.container}>
        {moods && moods.length > 0 && (
          <>
            <Animated.FlatList
              data={moods}
              ListHeaderComponent={() => (
                <>
                  <Text style={styles.emoji}>
                    Overall: {ratingReps[average - 1]}
                  </Text>
                  {moods.length > 1 && <Stats moods={moods} />}
                  {/* {factors.length > 0 &&
                    factors.map((factor) => (
                      <Text style={styles.factorText}>{factor}</Text>
                    ))} */}
                  {/* <Text style={styles.emoji}>Your entries:</Text> */}
                </>
              )}
              renderItem={({ item: moodEntry }) => (
                <EntryItem item={moodEntry} key={item.timestamp} />
              )}
              ListFooterComponent={() => (
                <>
                  {factors.length > 0 &&
                    factors.map((factor) => (
                      <View style={styles.factorItem} key={factor.displayName}>
                        <Text style={styles.factorText}>
                          {factor.displayName}
                        </Text>
                        <RatingButton isLifestyle>
                          {factor.value ? 'Yes' : 'No'}
                        </RatingButton>
                      </View>
                    ))}
                </>
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              numColumns={4}
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
  textWrapper: {
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 0,
    marginTop: HEADER_MIN_HEIGHT, // min height of headerContainer
  },
  flatList: {
    paddingTop: 70, // distance from headercontainer
  },
  factorItem: {
    alignItems: 'center',
    marginBottom: 20,
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
  factorText: {
    marginTop: 20,
    fontSize: 22,
    color: theme.colors.accent,
    textAlign: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 50,
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
