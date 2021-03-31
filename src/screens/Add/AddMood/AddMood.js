import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  setAllSymptoms,
  fetchSymptoms,
  fetchSymptomsWithMoods,
} from '../../../reducers/symptomsReducer';
import { sendMoods } from '../../../reducers/moodsReducer';

import Layout from '../../../components/Layout';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import MoodInput from '../../../components/AddMoodScreen/MoodInput';
import AddItemFooter from '../../../components/AddMoodScreen/AddItemFooter';
import Header from '../../../components/Header';

import LoadingScreen from '../../LoadingScreen';

const feels = ['1', '2', '3', '4', '5'];
// const symptoms = ['Anxiety', 'Physical Pain', 'Sleep']; // get these from user's firebase
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const AddMood = ({ route, navigation }) => {
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const dispatch = useDispatch();
  const moodsStatus = useSelector((state) => state.moods.status);
  const moods = useSelector((state) => state.moods.moods);
  console.log('lol', moods[0]);
  // const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    dispatch(fetchSymptoms());
  }, [dispatch]);

  const beforeDose = route.params ? route.params.beforeDose : false;

  const prompt = beforeDose
    ? 'How did you feel before dosing?'
    : 'How did you feel today?';

  const submit = async () => {
    navigation.navigate('AddLifestyle');
    // try {
    //   const resultAction = await dispatch(sendMoods(symptoms));
    //   if (resultAction.meta.requestStatus === 'fulfilled') {
    //     dispatch(fetchSymptomsWithMoods());
    //     navigation.navigate('Entries');
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const updateIndexAt = (rating, index) => {
    let newArr = [...symptoms];
    newArr[index] = {
      ...newArr[index],
      rating,
    };
    dispatch(setAllSymptoms(newArr));
  };

  if (moodsStatus === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      {beforeDose && <BackButton onPress={() => navigation.goBack()} />}
      <View style={styles.container}>
        <View style={styles.containerWithPadding}>
          {/* <TouchableOpacity
            style={styles.doseContainer}
            onPress={() => navigation.navigate('AddDosage')}>
            <Title style={styles.smallTitle}>16mg dosage at 9:00am</Title>
            <Title style={styles.smallTitle}>(Tap to change)</Title>
          </TouchableOpacity> */}
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
    marginTop: isBigPhone ? windowHeight / 20 : 30,
    marginBottom: 20,
  },
  containerWithPadding: {
    paddingHorizontal: 20,
    justifyContent: 'center',
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
