import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TextInput from '../components/TextInput';
import CheckboxInput from '../components/CheckboxInput';

const CbdDetails = ({ cbdDetails, setCbdDetails }) => {
  const [name, setName] = useState({ value: 'Leafy', error: '' });
  const [concentration, setConcentration] = useState({
    value: '500',
    error: '',
  });
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
        editable={!unavailable}
      />
      <View style={styles.mgContainer}>
        <TextInput
          placeholder="Concentration"
          returnKeyType="done"
          value={cbdDetails.mg}
          onChangeText={(text) => setCbdDetails({ ...cbdDetails, mg: text })}
          keyboardType="numeric"
          autoCompleteType="off"
          editable={!unavailable}
          width={200}
        />
        <Text style={styles.mgText}>mg</Text>
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
  mgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  mgText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#ffffff',
  },
});

export default CbdDetails;
