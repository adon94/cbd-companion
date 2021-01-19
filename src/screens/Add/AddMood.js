import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  Platform,
} from 'react-native';

import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Title from '../../components/Title';

import MoodInput from '../../components/AddMoodScreen/MoodInput';
import ListFooter from '../../components/AddMoodScreen/ListFooter';

import { store } from '../../core/store';
import { getSymptoms, addMood } from '../../api/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';

const isIos = Platform.OS === 'ios';

const feels = ['1', '2', '3', '4'];
// const symptoms = ['Anxiety', 'Physical Pain', 'Sleep']; // get these from user's firebase
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log(windowHeight);

const AddMood = ({ route, navigation }) => {
  const [symptoms, setSymptoms] = useState([]);
  const globalState = useContext(store);
  const {
    state: { dosage },
  } = globalState;

  useEffect(() => {
    async function fetchData() {
      const data = await getSymptoms();
      setSymptoms(data);
    }
    fetchData();
  }, []);

  const beforeDose = route.params ? route.params.beforeDose : false;

  const prompt = beforeDose
    ? 'How did you feel before dosing?'
    : 'How do you feel?';

  const submit = async (rating) => {
    if (beforeDose) {
      await addMood(symptoms);
    } else {
      await addMood(symptoms);
    }
    navigation.navigate('Entries');
  };

  const updateIndexAt = (rating, index) => {
    let newArr = [...symptoms];
    newArr[index] = {
      ...newArr[index],
      rating,
      dosage: beforeDose ? dosage.amount : null,
    };
    setSymptoms(newArr);
  };

  return (
    <Layout>
      {beforeDose && <BackButton onPress={() => navigation.goBack()} />}
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('AddDosage')}>
          <Title style={styles.smallTitle}>16mg dosage at 9:00am</Title>
          <Title style={styles.smallTitle}>(Tap to change)</Title>
        </TouchableOpacity>
        <Header lg>{prompt}</Header>
        {symptoms && symptoms.length > 0 ? (
          <FlatList
            data={symptoms}
            renderItem={({ item, index }) => (
              <MoodInput
                symptom={item}
                setSymptoms={(rating) => updateIndexAt(rating, index)}
                feels={feels}
              />
            )}
            ListFooterComponent={() => <ListFooter navigation={navigation} />}
            keyExtractor={(symptom) => symptom.name}
            horizontal={true}
            snapToAlignment="start"
            snapToInterval={windowWidth * 0.8}
            decelerationRate="fast"
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          />
        ) : (
          <ListFooter navigation={navigation} />
        )}
        <Button onPress={submit}>Done</Button>
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
    marginTop: isIos && windowHeight > 700 ? windowHeight / 15 : 0,
    marginBottom: 20,
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
