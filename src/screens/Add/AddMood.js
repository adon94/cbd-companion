import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  // TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  setAllSymptoms,
  fetchSymptoms,
  fetchSymptomsWithMoods,
} from '../../reducers/symptomsReducer';
import { sendMoods } from '../../reducers/moodsReducer';

import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
// import Title from '../../components/Title';
import MoodInput from '../../components/AddMoodScreen/MoodInput';
import AddSymptomFooter from '../../components/AddMoodScreen/AddSymptomFooter';
import Header from '../../components/Header';

import LoadingScreen from '../LoadingScreen';

const feels = ['1', '2', '3', '4'];
// const symptoms = ['Anxiety', 'Physical Pain', 'Sleep']; // get these from user's firebase
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const AddMood = ({ route, navigation }) => {
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const dispatch = useDispatch();
  const moodsStatus = useSelector((state) => state.moods.status);
  // const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    dispatch(fetchSymptoms());
  }, [dispatch]);

  const beforeDose = route.params ? route.params.beforeDose : false;

  const prompt = beforeDose
    ? 'How did you feel before dosing?'
    : 'How do you feel?';

  const submit = async () => {
    try {
      const resultAction = await dispatch(sendMoods(symptoms));
      if (resultAction.meta.requestStatus === 'fulfilled') {
        dispatch(fetchSymptomsWithMoods());
        navigation.navigate('Entries');
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

  if (moodsStatus === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      {beforeDose && <BackButton onPress={() => navigation.goBack()} />}
      <View style={styles.container}>
        <View style={styles.containerWithPadding}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('AddDosage')}>
            <Title style={styles.smallTitle}>16mg dosage at 9:00am</Title>
            <Title style={styles.smallTitle}>(Tap to change)</Title>
          </TouchableOpacity> */}
          <Header lg>{prompt}</Header>
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
              <AddSymptomFooter navigation={navigation} />
            )}
            keyExtractor={(symptom) => symptom.displayName}
            horizontal={true}
            snapToAlignment="start"
            snapToInterval={windowWidth * (isBigPhone ? 0.85 : 0.75)}
            decelerationRate="fast"
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          />
        ) : (
          <AddSymptomFooter navigation={navigation} />
        )}
        <View style={styles.containerWithPadding}>
          <Button onPress={submit}>Done</Button>
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
    marginTop: isBigPhone ? windowHeight / 15 : 30,
    marginBottom: 20,
  },
  containerWithPadding: {
    paddingHorizontal: 20,
  },
  smallTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  flatList: {
    alignItems: 'flex-end',
  },
});

export default AddMood;
