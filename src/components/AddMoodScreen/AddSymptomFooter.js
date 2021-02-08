import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

const AddSymptomFooter = ({ navigation }) => {
  return (
    <View style={styles.symptomContainer}>
      <Text style={styles.symptomText}>Track a new symptom</Text>
      <TouchableOpacity
        style={styles.boxesContainer}
        onPress={() => navigation.navigate('AddSymptom')}>
        <Ionicons name="add" size={80} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  symptomContainer: {
    paddingHorizontal: 20,
    width: windowWidth * 0.8,
  },
  symptomText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  boxesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    height: windowWidth * 0.75,
    marginVertical: 10,
    backgroundColor: '#f0f0f04D',
    borderRadius: 25,
  },
  feelBox: {
    backgroundColor: '#f0f0f04D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    marginVertical: 10,
  },
  activeBox: {
    backgroundColor: '#56ab2f',
  },
  feelText: {
    color: '#ffffff',
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
});

export default AddSymptomFooter;
