import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  setAllSymptoms,
  fetchSymptoms,
  setSelectedDate,
} from '../../../reducers/symptomsReducer';

import Layout from '../../../components/Layout';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import MoodInput from '../../../components/AddMoodScreen/MoodInput';
import AddItemFooter from '../../../components/AddMoodScreen/AddItemFooter';
import Header from '../../../components/Header';
import Title from '../../../components/Title';

import LoadingScreen from '../../LoadingScreen';
import { dateDisplay, isToday } from '../../../core/utils';
import { getDoseInfo } from '../../../api/database';

const feels = ['1', '2', '3', '4', '5'];
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const AddMood = ({ navigation }) => {
  const moodsStatus = useSelector((state) => state.moods.status);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const date = useSelector((state) => state.symptoms.selectedDate);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [doseInfo, setDoseInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchSymptoms());
    const sillyReq = async () => {
      const dI = await getDoseInfo(new Date());
      console.log('dI', dI);
      setDoseInfo(dI);
    };
    sillyReq();
  }, [dispatch]);

  if (moodsStatus === 'loading') {
    return <LoadingScreen />;
  }

  const prompt = isToday(new Date(date))
    ? 'How did you feel today?'
    : 'How did you feel that day?';

  const submit = async () => {
    navigation.navigate('AddLifestyle', { doseInfo });
  };

  const updateIndexAt = (rating, index) => {
    let newArr = [...symptoms];
    newArr[index] = {
      ...newArr[index],
      rating,
    };
    dispatch(setAllSymptoms(newArr));
  };

  const onDateChange = async (selectedDate) => {
    dispatch(setSelectedDate(new Date(selectedDate).toISOString()));
    const dI = await getDoseInfo(new Date(selectedDate));
    setDoseInfo(dI);
    setShowPicker(false);
  };

  return (
    <Layout>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.containerWithPadding}>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.doseContainer}>
            <Title style={styles.smallTitle}>
              {dateDisplay(new Date(date))}
            </Title>
            <Title style={styles.smallTitle}>(Tap to change)</Title>
          </TouchableOpacity>
          <Header centered>{prompt}</Header>
        </View>
        {symptoms && symptoms.length > 0 ? (
          <FlatList
            data={symptoms}
            renderItem={({ item, index }) => (
              <MoodInput
                symptom={item}
                setSymptoms={(rating) => updateIndexAt(rating, index)}
                feels={feels}
                isBigPhone={isBigPhone}
              />
            )}
            ListFooterComponent={() => (
              <AddItemFooter onPress={() => navigation.navigate('AddSymptom')}>
                Add a new goal
              </AddItemFooter>
            )}
            keyExtractor={(symptom) => symptom.displayName}
            decelerationRate="fast"
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          />
        ) : (
          <AddItemFooter onPress={() => navigation.navigate('AddSymptom')}>
            Add a new goal
          </AddItemFooter>
        )}
        <View style={[styles.containerWithPadding, styles.buttonContainer]}>
          <Button onPress={submit}>Next</Button>
        </View>
      </View>
      <DateTimePickerModal
        maximumDate={new Date()}
        date={new Date(date)}
        isVisible={showPicker}
        mode="date"
        onConfirm={onDateChange}
        onCancel={() => setShowPicker(false)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    marginTop: isBigPhone ? windowHeight / 20 : 30,
    marginBottom: 20,
  },
  containerWithPadding: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  smallTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  flatList: {
    alignItems: 'center',
  },
  doseContainer: {
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default AddMood;
