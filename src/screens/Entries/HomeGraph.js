import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Stats from './EntryScreen/Stats1';

const HomeGraph = ({ moods }) => {
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
    if (!notThisWeek) thisWeek.push(el);
    return notThisWeek;
  });

  return (
    <View>
      <Text style={styles.titleText}>{thisWeek.length > 0 ? 'This week' : 'No entries this week'}</Text>
      <Stats moods={thisWeek.reverse()} average />
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
