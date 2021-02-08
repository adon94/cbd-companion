import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  sendSymptomEdits,
  fetchSymptoms,
} from '../../../reducers/symptomsReducer';

import Layout from '../../../components/Layout';
import SymptomInput from '../../../components/Symptoms/SymptomInput';
import Button from '../../../components/Button';

import ds from '../../Onboarding/defaultSymptoms';

const AddSymptom = ({ navigation }) => {
  const existingSymptoms = useSelector((state) => state.symptoms.symptoms);
  const dispatch = useDispatch();
  const remainingDefaults = ds.filter(
    ({ displayName }) =>
      !existingSymptoms.some((es) => displayName === es.displayName),
  );
  const [defaultSymptoms, setDefaultSymptoms] = useState(remainingDefaults);

  const submit = async () => {
    const toRemove = defaultSymptoms.filter(({ existing }) => existing);
    const toAdd = existingSymptoms.filter((symptom) => symptom.new);

    await dispatch(sendSymptomEdits({ toAdd, toRemove }));
    navigation.goBack();
  };

  const cancel = async () => {
    await dispatch(fetchSymptoms());
    navigation.goBack();
  };

  return (
    <Layout>
      <View style={styles.container}>
        <SymptomInput
          defaultSymptoms={defaultSymptoms}
          setDefaultSymptoms={setDefaultSymptoms}
          navigation={navigation}
        />
        <View>
          <Button onPress={submit}>Save</Button>
          <Button mode="outlined" onPress={cancel}>
            Cancel
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default AddSymptom;
