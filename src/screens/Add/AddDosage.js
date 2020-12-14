import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import { store } from '../../core/store';
import { timeDisplay } from '../../core/utils';

import Layout from '../../components/Layout';
import { ADD_DOSAGE } from '../../core/store';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';

const AddDosage = ({ navigation }) => {
  const globalState = useContext(store);
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(true);
  const [dosage, setDosage] = useState({
    timestamp: new Date().toISOString(),
    amount: 16,
  });

  const onChange = (event, selectedDate) => {
    const timestamp = selectedDate.toISOString() || dosage.timestamp;
    setShow(Platform.OS === 'ios');
    setDosage({ ...dosage, timestamp });
  };

  const submit = async () => {
    const { dispatch } = globalState;
    dispatch({ type: ADD_DOSAGE, payload: dosage });
    navigation.navigate('AddMood', {
      beforeDose: true,
    });
  };

  return (
    <Layout>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.questionText}>Change my dosage</Text>
        <View>
          <TouchableOpacity style={styles.softButton} onPress={() => submit()}>
            <Text style={styles.buttonText}>{dosage.amount}mg</Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>at</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(dosage.timestamp)}
              mode="time"
              textColor="#ffffff"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TouchableOpacity
            style={styles.softButton}
            onPress={() => setShow(!show)}>
            <Text style={styles.buttonText}>
              {show ? 'Done' : timeDisplay(dosage.timestamp)}
            </Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <CheckBox
              tintColor="#f0f0f04D"
              onCheckColor="#ffffff"
              onTintColor="#ffffff"
              disabled={false}
              value={checked}
              onValueChange={(newValue) => setChecked(newValue)}
            />
            <Text style={styles.checkboxText}>Just for today</Text>
          </View>
        </View>
        <Button onPress={() => submit()}>
          <Text style={styles.buttonText}>Next</Text>
        </Button>
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
  questionText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  softButton: {
    backgroundColor: '#f0f0f04D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxText: {
    marginLeft: 10,
    color: '#ffffff',
    fontSize: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
});

export default AddDosage;
