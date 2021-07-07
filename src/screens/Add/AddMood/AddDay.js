import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CommonActions } from '@react-navigation/native';

import {
  setAllSymptoms,
  fetchSymptoms,
  setSelectedDate,
  fetchSymptomsWithMoods,
} from '../../../reducers/symptomsReducer';
import { sendMoods } from '../../../reducers/moodsReducer';

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
import {
  fetchLifestyle,
  removeSelections,
  setAllLifestyle,
} from '../../../reducers/lifestyleReducer';

const numbers = ['1', '2', '3', '4', '5'];
const noYes = ['No', 'Yes'];
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const AddDay = ({ navigation, route: { params } }) => {
  const moodsStatus = useSelector((state) => state.moods.status);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const lifestyleFactors = useSelector((state) => state.lifestyle.lifestyle);
  const date = useSelector((state) => state.symptoms.selectedDate);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [doseInfo, setDoseInfo] = useState(null);
  const [ratings, setRatings] = useState([]);
  const flatRef = useRef();
  const listItems = symptoms.concat(lifestyleFactors);
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    const sillyReq = async () => {
      const dI = await getDoseInfo(new Date());
      dispatch(fetchSymptoms());
      dispatch(fetchLifestyle());
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
    // navigation.navigate('AddLifestyle', { doseInfo });
    try {
      const resultAction = await dispatch(
        sendMoods({ symptoms, lifestyleFactors, date }),
      );
      if (resultAction.meta.requestStatus === 'fulfilled') {
        dispatch(setSelectedDate(new Date().toISOString()));
        // **TODO** reset selected date and lifestyle selections
        dispatch(removeSelections());
        dispatch(fetchSymptomsWithMoods());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Entries' }],
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateIndexAt = (rating, index) => {
    let newArr = [...symptoms];
    newArr[index] = {
      ...newArr[index],
      rating,
    };
    dispatch(setAllSymptoms(newArr));
  };

  const updateLifestyle = (rating, index) => {
    let newArr = [...lifestyleFactors];
    const actualIndex = index - symptoms.length - 1;
    newArr[actualIndex] = {
      ...newArr[actualIndex],
      rating,
    };
    dispatch(setAllLifestyle(newArr));
  };

  const onDateChange = async (selectedDate) => {
    dispatch(setSelectedDate(new Date(selectedDate).toISOString()));
    const dI = await getDoseInfo(new Date(selectedDate));
    setDoseInfo(dI);
    setShowPicker(false);
  };

  const addRating = ({ displayName }, rating, next) => {
    setRatings(ratings.concat([{ displayName, rating }]));
    if (next !== listItems.length) {
      setTimeout(() => {
        flatRef.current.scrollToIndex({ animated: true, index: next });
      }, 100);
    } else {
      setSubmittable(true);
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
        <View>
          {listItems && listItems.length > 0 ? (
            <FlatList
              ref={flatRef}
              data={listItems}
              renderItem={({ item, index }) => (
                <MoodInput
                  symptom={item}
                  addRating={(r) => addRating(item, r, index + 1)}
                  setSymptoms={(rating) =>
                    item.new
                      ? updateIndexAt(rating, index)
                      : updateLifestyle(rating, index)
                  }
                  feels={item.new ? numbers : noYes}
                  isBigPhone={isBigPhone}
                  isLifestyle={!item.new}
                />
              )}
              horizontal
              keyExtractor={(item) => item.displayName}
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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <AddItemFooter onPress={() => navigation.navigate('AddSymptom')}>
              Goals
            </AddItemFooter>
            <AddItemFooter
              onPress={() =>
                navigation.navigate('AddSymptom', { isLifestyle: true })
              }>
              Habits
            </AddItemFooter>
          </View>
        </View>
        <View
          style={[
            styles.containerWithPadding,
            styles.buttonContainer,
            !submittable && styles.disabled,
          ]}>
          <Button onPress={submit} disabled={!submittable}>
            Done
          </Button>
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
  disabled: {
    opacity: 0,
  },
});

export default AddDay;
