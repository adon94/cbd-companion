import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Stats from './EntryScreen/Stats1';

const WEEK = 'This week';
const OVERALL = 'Overall';

const HomeGraph = ({ moods }) => {
  const [view, setView] = useState(WEEK);
  let data = [];

  if (view === WEEK) {
    function getMonday(d) {
      d = new Date(d);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }

    const monday = getMonday(new Date());
    monday.setHours(0, 0, 0, 0);
    const thisWeek = [];
    moods.some((el) => {
      const notThisWeek = new Date(el.date) < monday;
      if (!notThisWeek) {
        data.push(el);
      }
      return notThisWeek;
    });
  } else {
    data = [...moods];
  }

  const showStats = data.length > 0;

  const toggleView = () => {
    if (view === WEEK) {
      setView(OVERALL);
    } else {
      setView(WEEK);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleView}>
        <Text style={styles.titleText}>
          {showStats ? view : `No entries${view === WEEK && ' this week'}`}
        </Text>
      </TouchableOpacity>
      {showStats && (
        <Stats moods={data.reverse()} displayDay={view === WEEK} average />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeGraph;
