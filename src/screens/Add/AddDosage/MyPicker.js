import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import { sendDose } from '../../../reducers/doseReducer';
import { fetchSymptomsWithMoods } from '../../../reducers/symptomsReducer';

import Button from '../../../components/Button';
import LinearGradient from 'react-native-linear-gradient';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

// myproducts:
// users/me/products/'leafly tincture',etc

// daily doses:
// users/me/days/2021-04-13/product, amount, time
// users/me/symptoms/anxiety/days/2021-04-13/product, brand, amount, time

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const MyPicker = ({ values, setValue, show, hide, selectedValue }) => {
  if (!show) return null;

  return (
    <LinearGradient
      colors={[topColor, bottomColor]}
      style={styles.pickerContainer}>
      <Picker
        itemStyle={styles.itemStyle}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
        {values.map((val) => (
          <Picker.Item key={val} label={val} value={val} />
        ))}
      </Picker>
      <Button
        // style={[styles.softButton, { alignSelf: 'center' }]}
        onPress={hide}>
        Done
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    // opacity: 0.4,
    height: screenHeight,
    width: screenWidth,
  },
  itemStyle: {
    color: '#fff',
  },
});

export default MyPicker;
