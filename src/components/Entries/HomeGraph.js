import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MoodChart from '../charts/MoodChart';

import Button from '../Button';

const WEEK = 'This week';
const OVERALL = 'Overall';

const HomeGraph = ({ moods }) => {
  const [view, setView] = useState(WEEK);
  // let data = [];

  // if (view === WEEK) {
  // const monday = getMonday();
  //   const thisWeek = [];
  //   moods.some((el) => {
  //     const notThisWeek = new Date(el.timestamp) < monday;
  //     if (!notThisWeek) {
  //       data.push(el);
  //     }
  //     return notThisWeek;
  //   });
  // } else {
  //   data = [...moods];
  // }

  const showStats = moods.length > 0;

  const toggleView = () => {
    if (view === WEEK) {
      setView(OVERALL);
    } else {
      setView(WEEK);
    }
  };

  if (!showStats) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          style={styles.icon}
          name="journal"
          size={145}
          color="#ffffff"
        />
        <Text style={styles.titleText}>No entries this week</Text>
        <Text style={[styles.infoText, styles.icon]}>
          If you took CBD several hours ago, now is a good time to log your
          mood.
        </Text>
        <Button capitalize>How do you feel?</Button>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleView}>
        <Text style={styles.titleText}>
          {showStats ? view : `No entries${view === WEEK && ' this week.'}`}
        </Text>
      </TouchableOpacity>
      {showStats && (
        <MoodChart moods={moods} displayDay={view === WEEK} average />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginBottom: 25 },
  infoText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeGraph;
