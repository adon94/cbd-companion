import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../core/theme';
import { getDayName, timeDisplay } from '../../core/utils';
import { ratingReps } from '../../core/constants';
import RatingButton from '../RatingButton';

const EntryItem = ({ item, symptomName, navigation }) => {
  const rating = Math.round(item.rating);

  const EntryContent = () => (
    <>
      <View style={styles.ratingContainer}>
        <Text style={styles.emoji}>{ratingReps[rating - 1]}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{getDayName(item.timestamp)}</Text>
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
    <View style={styles.plainContainer}>
      <RatingButton>{ratingReps[rating - 1]}</RatingButton>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{timeDisplay(item.timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f04D',
    borderRadius: 15,
    width: 70,
    height: 90,
    justifyContent: 'center',
  },
  plainContainer: {
    padding: 20,
    borderRadius: 16,
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 30,
    color: theme.colors.accent,
  },
  dateText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textContainer: {
    paddingVertical: 0,
  },
});

export default EntryItem;
