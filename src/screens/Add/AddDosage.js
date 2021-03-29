import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

// import { store } from '../../core/store';
import { timeDisplay } from '../../core/utils';
import { sendMoods } from '../../reducers/moodsReducer';
import { fetchSymptomsWithMoods } from '../../reducers/symptomsReducer';

import Layout from '../../components/Layout';
// import { ADD_DOSAGE } from '../../core/store';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import CheckboxInput from '../../components/CheckboxInput';

const AddDosage = ({ navigation }) => {
  // const globalState = useContext(store);
  const lifestyleFactors = useSelector((state) => state.lifestyle.lifestyle);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(true);
  const [dosage, setDosage] = useState({
    timestamp: new Date().toISOString(),
    amount: 16,
  });
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const timestamp = selectedDate.toISOString() || dosage.timestamp;
    setShow(Platform.OS === 'ios');
    setDosage({ ...dosage, timestamp });
  };

  const submit = async () => {
    try {
      const resultAction = await dispatch(
        sendMoods({ symptoms, lifestyleFactors }),
      );
      if (resultAction.meta.requestStatus === 'fulfilled') {
        dispatch(fetchSymptomsWithMoods());
        navigation.navigate('Entries');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.questionText}>My CBD dosage</Text>
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
          {/* <CheckboxInput checked={checked} setChecked={setChecked}>
            Set daily reminder to this time
          </CheckboxInput> */}
        </View>
        <Button onPress={() => submit()}>
          <Text style={styles.buttonText}>Done</Text>
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
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
});

export default AddDosage;
