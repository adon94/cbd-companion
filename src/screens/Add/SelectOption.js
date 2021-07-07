import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Layout from '../../components/Layout';

import { isToday } from '../../core/utils';

const width = Dimensions.get('screen').width;
const buttonSize = (width - 60) / 2 - 70;

const SelectAdd = ({ navigation }) => {
  const lastDosedAt = useSelector((state) => state.dose.last.lastDosedAt);
  const moods = useSelector((state) => state.moods.weekMoods);

  const moodDone =
    moods.length > 0 && isToday(new Date(moods[moods.length - 1].timestamp));

  const dosedToday = lastDosedAt ? isToday(new Date(lastDosedAt)) : false;

  const dose = () => {
    navigation.navigate('AddDose');
  };

  const mood = () => {
    navigation.navigate('AddMood');
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Header lg>What would you like to do?</Header>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, dosedToday && styles.small]}
            onPress={dose}>
            <View style={styles.iconContainer}>
              <Ionicons name="eyedrop" size={45} color="#ffffff" />
            </View>
            <Text style={styles.buttonText}>dose</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, (!dosedToday || moodDone) && styles.small]}
            onPress={mood}>
            <View style={styles.iconContainer}>
              <Ionicons name="heart" size={45} color="#ffffff" />
            </View>
            <Text style={styles.buttonText}>mood</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
    marginTop: 85,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    width: 150,
  },
  small: {
    transform: [{ scale: 0.8 }],
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    textTransform: 'uppercase',
    flexWrap: 'wrap',
  },
});

export default SelectAdd;
