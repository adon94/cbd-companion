import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Layout from '../../components/Layout';
import DaysOfWeek from './DaysOfWeek';

const Stats = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Stats coming soon</Text>
        <DaysOfWeek />
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
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Stats;
