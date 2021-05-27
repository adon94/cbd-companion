import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Button from '../../../components/Button';
import LinearGradient from 'react-native-linear-gradient';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

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
      <Button onPress={hide}>Done</Button>
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
    height: screenHeight,
    width: screenWidth,
  },
  itemStyle: {
    color: '#fff',
  },
});

export default MyPicker;
