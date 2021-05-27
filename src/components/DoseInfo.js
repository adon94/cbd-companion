import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../core/theme';

import { isToday, timeDisplay } from '../core/utils';

import { fetchDoseInfo } from '../reducers/doseReducer';

const DoseInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const lastDose = useSelector((state) => state.dose.last);

  const isDoseToday = lastDose.lastDosedAt
    ? isToday(new Date(lastDose.lastDosedAt))
    : false;

  useEffect(() => {
    dispatch(fetchDoseInfo());
  }, [dispatch]);

  const goToDose = () => {
    navigation.navigate('Add', {
      screen: 'AddTab',
      params: { screen: 'AddDose' },
    });
  };

  if (isDoseToday) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dosed {lastDose.lastDoseAmount}</Text>
        <Text style={styles.text}>
          of {lastDose.lastBrand} {lastDose.lastProduct}
        </Text>
        <Text style={styles.text}>
          today at {timeDisplay(lastDose.lastDosedAt)}.
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
});

export default DoseInfo;
