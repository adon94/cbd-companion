import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Layout from '../components/Layout';

const Stats = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Stats coming soon</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    marginVertical: 50,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Stats;
