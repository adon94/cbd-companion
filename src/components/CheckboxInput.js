import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CheckboxInput = ({ checked, setChecked, children }) => {
  return (
    <TouchableOpacity
      onPress={() => setChecked(!checked)}
      style={styles.checkboxContainer}>
      <View style={styles.iconContainer}>
        <CheckBox
          tintColor="#f0f0f04D"
          onCheckColor="#ffffff"
          onTintColor="#ffffff"
          disabled={false}
          value={checked}
          onValueChange={(newValue) => setChecked(newValue)}
        />
      </View>
      <Text style={styles.checkboxText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    // marginLeft: 10,
    color: '#ffffff',
    fontSize: 20,
  },
});

export default CheckboxInput;
