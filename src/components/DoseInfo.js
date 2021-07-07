import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { theme } from '../core/theme';

import { convertFromMg, isToday, timeDisplay } from '../core/utils';

const DoseInfo = ({ navigation }) => {
  const lastDose = useSelector((state) => state.dose.last);

  const { measurement, lastDosedAt, lastDoseMg } = lastDose;

  const isDoseToday = lastDosedAt ? isToday(new Date(lastDosedAt)) : false;

  const goToDose = () => {
    navigation.navigate('Add', {
      screen: 'AddTab',
      params: { screen: 'AddDose', params: { previousScreen: 'Entries' } },
    });
  };

  const amount =
    measurement === 'mg'
      ? lastDoseMg
      : convertFromMg(
          lastDoseMg,
          measurement,
          lastDose.lastMl,
          lastDose.lastMg,
        );

  if (isDoseToday) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.subtitle]}>Last dose:</Text>
        <Text style={styles.text}>
          {amount} {lastDose.measurement} of {lastDose.lastBrand}{' '}
          {lastDose.lastProduct}
        </Text>
        <Text style={styles.text}>
          Today at {timeDisplay(lastDose.lastDosedAt)}.
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={goToDose} style={styles.container}>
      <Text style={styles.text}>No dose logged today.</Text>
      <Text style={styles.text}>Add one now?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.semiTransparent,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontWeight: 'bold',
  },
});

export default DoseInfo;
