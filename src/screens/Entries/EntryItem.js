import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../core/theme';
import { dateDisplay, timeDisplay } from '../../core/utils';
import { ratingReps } from '../../core/constants';

const EntryItem = ({ item, symptomName, navigation }) => {
  const rating = Math.round(item.rating);
  const dateTime = navigation
    ? dateDisplay(item.date)
    : timeDisplay(item.timestamp);

  const EntryContent = () => (
    <>
      <View style={styles.ratingContainer}>
        <Text style={styles.emoji}>{ratingReps[rating - 1]}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{dateTime}</Text>
        <Text style={styles.notesText}>Some notes here...</Text>
      </View>
    </>
  );

  if (navigation) {
    const Navigatable = ({ children }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('EntryScreen', { ...item, symptomName })
        }>
        {children}
      </TouchableOpacity>
    );

    return (
      <Navigatable>
        <EntryContent />
      </Navigatable>
    );
  }

  return (
    <View style={styles.card}>
      <EntryContent />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f04D',
    padding: 20,
    borderRadius: 16,
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  emoji: {
    fontSize: 30,
    color: theme.colors.accent,
  },
  ratingContainer: {
    marginRight: 25,
    marginLeft: 5,
  },
  dateText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  notesText: {
    color: '#ffffff',
    fontSize: 16,
  },
  textContainer: {
    paddingVertical: 0,
  },
});

export default EntryItem;
