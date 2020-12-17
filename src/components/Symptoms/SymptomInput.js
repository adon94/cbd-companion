import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CheckboxInput from '../../components/CheckboxInput';

const SymptomInput = ({ symptoms, setSymptoms }) => {
  const { anxiety, sleep, epilepsy, chronicPain } = symptoms;

  return (
    <View>
      <CheckboxInput
        checked={anxiety}
        setChecked={(value) => setSymptoms({ ...symptoms, anxiety: value })}>
        Anxiety
      </CheckboxInput>
      <CheckboxInput
        checked={sleep}
        setChecked={(value) => setSymptoms({ ...symptoms, sleep: value })}>
        Sleep
      </CheckboxInput>
      <CheckboxInput
        checked={epilepsy}
        setChecked={(value) => setSymptoms({ ...symptoms, epilepsy: value })}>
        Epilepsy
      </CheckboxInput>
      <CheckboxInput
        checked={chronicPain}
        setChecked={(value) =>
          setSymptoms({ ...symptoms, chronicPain: value })
        }>
        Chronic Pain
      </CheckboxInput>
      <TouchableOpacity style={styles.plainTextButton}>
        <View style={styles.iconContainer}>
          <Ionicons name="add-circle-outline" size={40} color="#ffffff" />
        </View>
        <Text style={styles.plainText}>Add a symptom</Text>
      </TouchableOpacity>
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
});

export default SymptomInput;
