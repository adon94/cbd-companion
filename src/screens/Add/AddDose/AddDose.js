import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CommonActions } from '@react-navigation/native';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import BackButton from '../../../components/BackButton';
import MyPicker from './MyPicker';

import {
  convertFromMg,
  convertToMg,
  dateTimeDisplay,
} from '../../../core/utils';
import {
  fetchDoseInfo,
  sendDose,
  setDoseInfo,
} from '../../../reducers/doseReducer';
import { fetchSymptomsWithMoods } from '../../../reducers/symptomsReducer';

const windowWidth = Dimensions.get('window').width;

const AddDose = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const dose = useSelector((state) => state.dose.doseInfo);
  const options = useSelector((state) => state.dose.options);
  const measurement = useSelector((state) => state.dose.last.measurement);
  const [show, setShow] = useState(false);
  const [showDt, setShowDt] = useState(false);

  const { doseMg, mg, ml } = dose;

  const setDose = (doseInfo, index) => {
    dispatch(setDoseInfo({ ...doseInfo, index }));
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

  const doseDisplayValue =
    measurement === 'mg' ? doseMg : convertFromMg(doseMg, measurement, ml, mg);

  return (
    <Layout>
      <BackButton onPress={() => goBack()} />
      <View style={styles.container}>
        <Text style={styles.questionText}>Confirm dose</Text>
        <View>
          <Button
            capitalize={dose.brand != null}
            outlined
            onPress={() => navigation.navigate('AddProduct')}>
            {dose.brand ? `${dose.brand} ${dose.product}` : 'Select a product'}
          </Button>
          <Button
            capitalize
            style={styles.topButton}
            onPress={() => setShow(!show)}
            outlined>
            {doseDisplayValue}{' '}
            {dose.doseMg === 1 && measurement === 'drops'
              ? 'drop'
              : measurement}
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
        values={options[measurement]}
        setValue={(v, i) =>
          setDose(
            {
              ...dose,
              doseMg:
                measurement === 'mg' ? v : convertToMg(v, measurement, ml, mg),
            },
            i,
          )
        }
        show={show}
        hide={() => setShow(false)}
        selectedValue={doseDisplayValue}
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
