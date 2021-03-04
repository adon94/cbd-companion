import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const boxSize = windowWidth * (isBigPhone ? 0.35 : 0.3);

const MoodInput = ({ feels, symptom, setSymptoms }) => {
  const [rating, setRating] = useState();

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
          <TouchableOpacity
            key={feel}
            style={[styles.feelBox, index + 1 === rating && styles.activeBox]}
            onPress={() => setActive(index)}>
            <Text style={styles.feelText}>{feel}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  symptomContainer: {
    paddingHorizontal: 0,
    width: windowWidth * (isBigPhone ? 0.8 : 0.7), // leaves a space-between boxes of 10% ww
    marginLeft: 20,
  },
  symptomText: {
    color: '#fff',
    fontSize: windowWidth / 17,
    fontWeight: 'bold',
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginRight: 20,
  },
  feelBox: {
    backgroundColor: '#f0f0f04D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: boxSize,
    width: boxSize,
    marginVertical: 10,
  },
  activeBox: {
    backgroundColor: '#009432',
  },
  feelText: {
    color: '#ffffff',
    fontSize: windowWidth / 6,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
});

export default MoodInput;
