import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;

const boxSize = 35;

const AddItemFooter = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.symptomContainer} onPress={onPress}>
      <View style={styles.boxesContainer}>
        <Ionicons name="pencil" size={windowWidth / 20} color="#ffffff" />
      </View>
      <Text style={styles.symptomText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  symptomContainer: {
    paddingRight: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  symptomText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  boxesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 10,
    // backgroundColor: '#f0f0f04D',
    borderRadius: 100,
    height: boxSize,
    width: boxSize,
  },
});

export default AddItemFooter;
