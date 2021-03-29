import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const RatingButton = ({ isLifestyle, active, onPress, children }) => {
  const boxSize = isLifestyle ? 60 : 40;

  return (
    <TouchableOpacity
      style={[
        styles.feelBox,
        active && styles.activeBox,
        { width: boxSize, height: boxSize },
      ]}
      onPress={onPress}>
      <Text style={styles.feelText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  feelBox: {
    backgroundColor: '#f0f0f04D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  activeBox: {
    backgroundColor: '#009432',
  },
  feelText: {
    color: '#ffffff',
    fontSize: windowWidth / 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RatingButton;
