import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import MoodChart from '../charts/MoodChart';
import { isToday } from '../../core/utils';

import Button from '../Button';

const WEEK = 'This week';
const OVERALL = 'Overall';

const HomeGraph = ({ moods, navigation }) => {
  const [view, setView] = useState(WEEK);
  const lastDose = useSelector((state) => state.dose.last);

  const isDoseToday = lastDose.lastDosedAt
    ? isToday(new Date(lastDose.lastDosedAt))
    : false;

  const showStats = moods.length > 0;

  const toggleView = () => {
    if (view === WEEK) {
      setView(OVERALL);
    } else {
      setView(WEEK);
    }
  };

  const goToAdd = (screen) => {
    navigation.navigate('Add', {
      screen: 'AddTab',
      params: { screen, params: { previousScreen: 'Entries' } },
    });
  };

  if (!showStats) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons style={styles.icon} name="book" size={145} color="#ffffff" />
        <Text style={styles.titleText}>No entries this week</Text>
        {isDoseToday ? (
          <>
            <Text style={[styles.infoText, styles.icon]}>
              If you took CBD several hours ago, now is a good time to log your
              mood.
            </Text>
            <Button onPress={() => goToAdd('AddMood')} capitalize>
              How do you feel?
            </Button>
          </>
        ) : (
          <>
            <Text style={[styles.infoText, styles.icon]}>
              If you just took CBD, now is a good time to confirm your dose.
            </Text>
            <Button onPress={() => goToAdd('AddDose')} capitalize>
              Confirm dose
            </Button>
          </>
        )}
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
