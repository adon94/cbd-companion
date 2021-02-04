import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TextInput from '../components/TextInput';
import CheckboxInput from '../components/CheckboxInput';

const CbdDetails = ({ cbdDetails, setCbdDetails }) => {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <View>
      <TextInput
        placeholder="Brand name"
        returnKeyType="next"
        value={cbdDetails.brandName}
        onChangeText={(text) =>
          setCbdDetails({ ...cbdDetails, brandName: text })
        }
        autoCapitalize="words"
        autoCompleteType="off"
        disabled={unavailable}
      />
      <View style={styles.doubleColumn}>
        <View style={styles.mgContainer}>
          <TextInput
            placeholder="Concentration"
            returnKeyType="done"
            value={cbdDetails.mg}
            onChangeText={(text) => setCbdDetails({ ...cbdDetails, mg: text })}
            keyboardType="numeric"
            autoCompleteType="off"
            disabled={unavailable}
            width={120}
          />
          <Text style={styles.mgText}>mg</Text>
        </View>
        <View style={styles.mgContainer}>
          <TextInput
            placeholder="Amount"
            returnKeyType="done"
            value={cbdDetails.ml}
            onChangeText={(text) => setCbdDetails({ ...cbdDetails, ml: text })}
            keyboardType="numeric"
            autoCompleteType="off"
            disabled={unavailable}
            width={120}
          />
          <Text style={styles.mgText}>ml</Text>
        </View>
      </View>
      <CheckboxInput checked={unavailable} setChecked={setUnavailable}>
        I don't have this information yet
      </CheckboxInput>
    </View>
  );
};

const styles = StyleSheet.create({
  plainTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  plainText: {
    marginLeft: 0,
    color: '#ffffff',
    fontSize: 20,
  },
  doubleColumn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mgText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#ffffff',
  },
});

export default CbdDetails;
