import React from 'react';
// import { Form, Icon, Picker } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Label from '../../components/Label';

const SelectButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.selectContainer}>
      <Label>{children}</Label>
      <Ionicons
        style={styles.icon}
        name="arrow-down"
        size={20}
        color="#ffffff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
});

export default SelectButton;
