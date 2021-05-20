import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMoods } from '../../reducers/moodsReducer';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import SelectSymptomButton from '../../components/Entries/SelectButton';
import DaysOfWeek from './DaysOfWeek';
import LifestyleCorrelation from './LifestyleCorrelation';

const Stats = ({ navigation }) => {
  const dispatch = useDispatch();
  const viewingSymptom = useSelector((state) => state.viewingSymptom);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const moods = useSelector((state) => state.moods.moods);

  useEffect(() => {
    dispatch(fetchAllMoods(symptoms[viewingSymptom].displayName));
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <Header style={styles.header}>Advanced Stats</Header>
        {symptoms[viewingSymptom] && (
          <SelectSymptomButton
            onPress={() => navigation.navigate('SelectSymptom', { all: true })}>
            {symptoms[viewingSymptom].displayName}
          </SelectSymptomButton>
        )}
        <View style={styles.chartsContainers}>
          <DaysOfWeek moods={moods} />
          <LifestyleCorrelation />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    marginTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  chartsContainers: {
    marginTop: 20,
  },
});

export default Stats;
