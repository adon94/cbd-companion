import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Layout from '../../components/Layout';

const SelectAdd = ({ navigation }) => {
  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.feelBox}
          onPress={() => navigation.navigate('AddDosage')}>
          <Text style={styles.feelText}>I just dosed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.feelBox}
          onPress={() => navigation.navigate('AddMood', { beforeDose: false })}>
          <Text style={styles.feelText}>Add my mood</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  feelBox: {
    backgroundColor: '#f0f0f04D',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  feelText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
});

export default SelectAdd;
