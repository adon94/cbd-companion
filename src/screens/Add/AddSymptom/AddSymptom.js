import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  sendSymptomEdits,
  fetchSymptoms,
} from '../../../reducers/symptomsReducer';
import {
  sendLifestyleEdits,
  fetchLifestyle,
} from '../../../reducers/lifestyleReducer';

import Layout from '../../../components/Layout';
import SymptomInput from '../../../components/Symptoms/SymptomInput';
import Button from '../../../components/Button';

import { ds, df } from '../../Onboarding/defaultOptions';

const AddSymptom = ({ navigation, route: { params } }) => {
  const { isLifestyle } = params || false;
  const dispatch = useDispatch();
  const existingSymptoms = useSelector((state) =>
    isLifestyle ? state.lifestyle.lifestyle : state.symptoms.symptoms,
  );

  const remainingDefaults = isLifestyle
    ? df.filter(
        ({ displayName }) =>
          !existingSymptoms.some((es) => displayName === es.displayName),
      )
    : ds.filter(
        ({ displayName }) =>
          !existingSymptoms.some((es) => displayName === es.displayName),
      );
  const [defaultSymptoms, setDefaultSymptoms] = useState(remainingDefaults);

  const submit = async () => {
    const toRemove = defaultSymptoms.filter(({ existing }) => existing);
    const toAdd = existingSymptoms.filter((symptom) => symptom.new);
    const edits = { toAdd, toRemove };

    await dispatch(
      isLifestyle ? sendLifestyleEdits(edits) : sendSymptomEdits(edits),
    );
    navigation.goBack();
  };

  const cancel = async () => {
    await dispatch(isLifestyle ? fetchLifestyle() : fetchSymptoms());
    navigation.goBack();
  };

  return (
    <Layout>
      <View style={styles.container}>
        <SymptomInput
          defaultSymptoms={defaultSymptoms}
          setDefaultSymptoms={setDefaultSymptoms}
          navigation={navigation}
          isLifestyle={isLifestyle}
        />
        <View>
          <Button onPress={submit}>Save</Button>
          <Button cancel onPress={cancel}>
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
