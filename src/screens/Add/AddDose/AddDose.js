import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CommonActions } from '@react-navigation/native';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import BackButton from '../../../components/BackButton';
import MyPicker from './MyPicker';

import { dateTimeDisplay } from '../../../core/utils';
import {
  fetchDoseInfo,
  sendDose,
  setDoseInfo,
} from '../../../reducers/doseReducer';
import { fetchSymptomsWithMoods } from '../../../reducers/symptomsReducer';

const drops = ['1 drop', '2 drops', '3 drops', '4 drops', '5 drops', '6 drops'];
const windowWidth = Dimensions.get('window').width;

const AddDose = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const dose = useSelector((state) => state.dose.doseInfo);
  const [show, setShow] = useState(false);
  const [showDt, setShowDt] = useState(false);

  const setDose = (doseInfo) => {
    dispatch(setDoseInfo(doseInfo));
  };

  const onTimeChange = (selectedTime) => {
    const date = new Date(selectedTime);
    const dosedAt = date.toISOString();
    dispatch(setDoseInfo({ ...dose, dosedAt }));
    setShowDt(false);
  };

  useEffect(() => {
    dispatch(fetchDoseInfo());
  }, [dispatch]);

  const submit = async () => {
    try {
      const resultAction = await dispatch(sendDose(dose));
      if (resultAction.meta.requestStatus === 'fulfilled') {
        dispatch(fetchSymptomsWithMoods());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Entries' }],
          }),
        );
      } else {
        console.log(resultAction.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    if (params?.previousScreen === 'Entries') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Entries' }],
        }),
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <Layout>
      <BackButton onPress={() => goBack()} />
      <View style={styles.container}>
        <Text style={styles.questionText}>Confirm dose</Text>
        <View>
          <Button
            capitalize
            style={styles.topButton}
            onPress={() => setShow(!show)}
            outlined>
            {dose.doseAmount || '1 drop'}
          </Button>
          <Button
            capitalize={dose.brand != null}
            outlined
            onPress={() => navigation.navigate('AddProduct')}>
            {dose.brand ? `${dose.brand} ${dose.product}` : 'Select a product'}
          </Button>
          <Text style={styles.regText}>at</Text>
          <Button outlined capitalize onPress={() => setShowDt(!show)}>
            {dateTimeDisplay(dose.dosedAt || new Date().toISOString())}
          </Button>
        </View>
        <Button fullWidth onPress={() => submit()}>
          Done
        </Button>
      </View>
      <MyPicker
        values={drops}
        setValue={(v) => setDose({ ...dose, doseAmount: v })}
        show={show}
        hide={() => setShow(false)}
        selectedValue={dose.doseAmount || '1 drop'}
        showOption
      />
      <DateTimePickerModal
        maximumDate={new Date()}
        date={dose.dosedAt ? new Date(dose.dosedAt) : new Date()}
        isVisible={showDt}
        mode="datetime"
        onConfirm={onTimeChange}
        onCancel={() => setShowDt(false)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  topButton: {
    marginBottom: 20,
  },
  regText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
  button: {
    marginVertical: 10,
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: windowWidth / 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default AddDose;
