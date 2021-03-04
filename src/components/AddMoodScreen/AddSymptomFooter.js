import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const AddSymptomFooter = ({ navigation }) => {
  return (
    <View style={styles.symptomContainer}>
      <Text style={styles.symptomText}>Something else...</Text>
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
    width: windowWidth * (isBigPhone ? 0.8 : 0.7),
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
    height: windowWidth * (isBigPhone ? 0.75 : 0.65),
    marginVertical: 10,
    backgroundColor: '#f0f0f04D',
    borderRadius: 25,
  },
});

export default AddSymptomFooter;
