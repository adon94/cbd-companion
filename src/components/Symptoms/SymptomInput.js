import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SortableList from 'react-native-sortable-list';

import CheckboxInput from '../../components/CheckboxInput';

// Adding 'primary goal' function before working on notifictions

const Row = ({ data: { label, checked, setChecked }, index }) => {
  // if (index === 0) {
  //   return (
  //     <View style={{ height: 500 }}>
  //       <Text style={styles.indicator}>Primary goal</Text>
  //       <View style={styles.rowContainer}>
  //         <CheckboxInput checked={checked} setChecked={setChecked}>
  //           {label}
  //         </CheckboxInput>
  //         <Ionicons name="menu-outline" size={35} color="#ffffff" />
  //       </View>
  //       <View style={styles.divider} />§§
  //     </View>
  //   );
  // }

  return (
    <View style={styles.rowContainer}>
      <CheckboxInput checked={checked} setChecked={setChecked}>
        {label}
        {index === 0 && checked && ' (Primary goal)'}
      </CheckboxInput>
      <Ionicons name="menu-outline" size={35} color="#ffffff" />
    </View>
  );
};

const SymptomInput = ({ symptoms, setSymptoms }) => {
  const { anxiety, sleep, epilepsy, chronicPain } = symptoms;

  const symptomList = {
    0: {
      label: 'Anxiety',
      checked: anxiety,
      setChecked: (value) => setSymptoms({ ...symptoms, anxiety: value }),
    },
    1: {
      label: 'Sleep',
      checked: sleep,
      setChecked: (value) => setSymptoms({ ...symptoms, sleep: value }),
    },
    2: {
      label: 'Epilepsy',
      checked: epilepsy,
      setChecked: (value) => setSymptoms({ ...symptoms, epilepsy: value }),
    },
    3: {
      label: 'Chronic Pain',
      checked: chronicPain,
      setChecked: (value) => setSymptoms({ ...symptoms, chronicPain: value }),
    },
  };

  return (
    <View style={styles.container}>
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={symptomList}
        renderRow={Row}
        scrollEnabled={false}
      />
      {/* <CheckboxInput
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
      </CheckboxInput> */}
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
  container: {
    marginTop: 50,
  },
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicator: {
    color: '#fff',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 100,
  },
});

export default SymptomInput;
