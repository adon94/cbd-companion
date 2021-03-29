import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

const boxSize = 40;

const AddItemFooter = ({ onPress, children }) => {
  return (
    <View style={styles.symptomContainer}>
      <Text style={styles.symptomText}>{children}</Text>
      <TouchableOpacity style={styles.boxesContainer} onPress={onPress}>
        <Ionicons name="add" size={windowWidth / 17} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  symptomContainer: {
    paddingHorizontal: 20,
    marginTop: 35,
    alignItems: 'center',
  },
  symptomText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#f0f0f04D',
    borderRadius: 100,
    height: boxSize,
    width: boxSize,
  },
});

export default AddItemFooter;
