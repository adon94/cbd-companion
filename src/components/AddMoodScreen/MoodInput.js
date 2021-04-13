import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import RatingButton from '../RatingButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const MoodInput = ({ feels, symptom, setSymptoms, isLifestyle }) => {
  const [rating, setRating] = useState();

  useEffect(() => {
    if (symptom.rating && !rating) {
      setRating(symptom.rating);
    }
  }, []);

  const setActive = (index) => {
    if (index + 1 === rating) {
      setRating(null);
      setSymptoms(null);
    } else {
      setRating(index + 1);
      setSymptoms(index + 1);
    }
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
            onPress={() => setActive(index)}>
            {feel}
          </RatingButton>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  symptomContainer: {
    paddingHorizontal: 0,
    marginTop: 35,
    width: windowWidth * (isBigPhone ? 0.95 : 0.95), // leaves a space-between boxes of 10% ww
  },
  symptomText: {
    color: '#fff',
    fontSize: windowWidth / 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 5,
  },
});

export default MoodInput;
