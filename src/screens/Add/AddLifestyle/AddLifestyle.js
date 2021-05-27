import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import { fetchSymptomsWithMoods } from '../../../reducers/symptomsReducer';
import {
  fetchLifestyle,
  setAllLifestyle,
} from '../../../reducers/lifestyleReducer';
import { sendMoods } from '../../../reducers/moodsReducer';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import MoodInput from '../../../components/AddMoodScreen/MoodInput';
import AddItemFooter from '../../../components/AddMoodScreen/AddItemFooter';
import Header from '../../../components/Header';

import LoadingScreen from '../../LoadingScreen';

const feels = ['No', 'Yes'];
// const symptoms = ['Anxiety', 'Physical Pain', 'Sleep']; // get these from user's firebase
const windowHeight = Dimensions.get('window').height;

const isBigPhone = windowHeight > 700;

const AddLifestyle = ({ navigation, route: { params } }) => {
  const { doseInfo } = params || null;
  const lifestyleFactors = useSelector((state) => state.lifestyle.lifestyle);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const selectedDate = useSelector((state) => state.symptoms.selectedDate);
  const dispatch = useDispatch();
  const moodsStatus = useSelector((state) => state.moods.status);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    dispatch(fetchLifestyle());
  }, [dispatch]);

  const showAlert = () =>
    Alert.alert(
      'No dose logged for today',
      'Would you like to add one now?',
      [
        {
          text: 'Yes',
          onPress: () => Alert.alert('Yes Pressed'), // open dose
          style: 'default',
        },
        {
          text: 'No',
          onPress: () => submit(),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          setAlertShown(true);
        },
      },
    );

  const submit = async () => {
    if (!doseInfo && !alertShown) {
      showAlert();
    } else {
      try {
        const resultAction = await dispatch(
          sendMoods({ symptoms, lifestyleFactors, selectedDate }),
        );
        if (resultAction.meta.requestStatus === 'fulfilled') {
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
    }
  };

  const updateIndexAt = (rating, index) => {
    let newArr = [...lifestyleFactors];
    newArr[index] = {
      ...newArr[index],
      rating,
    };
    dispatch(setAllLifestyle(newArr));
  };

  if (moodsStatus === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.containerWithPadding}>
          <Header centered>Lifestyle Factors</Header>
        </View>
        {lifestyleFactors && lifestyleFactors.length > 0 ? (
          <FlatList
            data={lifestyleFactors}
            renderItem={({ item, index }) => (
              <MoodInput
                symptom={item}
                setSymptoms={(rating) => updateIndexAt(rating, index)}
                feels={feels}
                isBigPhone={isBigPhone}
                isLifestyle
              />
            )}
            ListFooterComponent={() => (
              <AddItemFooter
                onPress={() =>
                  navigation.navigate('AddSymptom', { isLifestyle: true })
                }>
                Add other factors
              </AddItemFooter>
            )}
            keyExtractor={(symptom) => symptom.displayName}
            decelerationRate="fast"
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          />
        ) : (
          <AddItemFooter
            onPress={() =>
              navigation.navigate('AddSymptom', { isLifestyle: true })
            }>
            Add lifestyle factors
          </AddItemFooter>
        )}
        <View style={[styles.containerWithPadding, styles.buttonContainer]}>
          <Button onPress={() => navigation.goBack()}>Back</Button>
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
    marginTop: isBigPhone ? windowHeight / 20 : 30,
    marginBottom: 20,
  },
  containerWithPadding: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-between',
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

export default AddLifestyle;
