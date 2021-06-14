import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import RatingButton from '../RatingButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const MoodInput = ({ feels, symptom, setSymptoms, isLifestyle, addRating }) => {
  const [rating, setRating] = useState();

  useEffect(() => {
    if (symptom.rating && !rating) {
      setRating(symptom.rating);
    }
  }, []);

  const setActive = (r) => {
    if (r === rating) {
      setRating(null);
      setSymptoms(null);
    } else {
      setRating(r);
      setSymptoms(r);
    }
  };

  const onRating = (r) => {
    setActive(r);
    addRating(r);
  };

  return (
    <View style={styles.symptomContainer}>
      <Text style={styles.symptomText}>{symptom.displayName}</Text>
      <View style={styles.boxesContainer}>
        {feels.map((feel, index) => (
          <RatingButton
            key={feel}
            active={index + 1 === rating}
            isLifestyle={isLifestyle}
            onPress={() => onRating(index + 1)}>
            {feel}
          </RatingButton>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  symptomContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f04D',
    // paddingVertical: 60,
    height: windowHeight / 4,
    paddingHorizontal: 20,
    marginTop: 35,
    width: windowWidth - 40,
    justifyContent: 'center',
  },
  symptomText: {
    color: '#fff',
    fontSize: windowWidth / 17,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 10,
  },
});

export default MoodInput;
