import React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { setViewingSymptom } from '../../reducers/viewingSymptomReducer';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

const screenWidth = Dimensions.get('window').width;

const BOX_SIZE = (screenWidth - 60) / 2;

const SymptomItem = ({ symptom, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.box}>
    <Text style={styles.symptomText}>{symptom.displayName}</Text>
  </TouchableOpacity>
);

const SelectSymptom = ({ navigation }) => {
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const dispatch = useDispatch();

  const submit = (index) => {
    dispatch(setViewingSymptom(index));
    navigation.goBack();
  };

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <FlatList
          // ListFooterComponent={() => <HomeGraph moods={moods} />}
          data={symptoms}
          renderItem={({ item, index }) => (
            <SymptomItem symptom={item} onPress={() => submit(index)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
        />
        <View style={styles.containerWithPadding}>
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: '#f0f0f04D',
    padding: 20,
    borderRadius: 25,
    marginVertical: 10,
  },
  symptomText: {
    fontSize: screenWidth / 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
  },
  containerWithPadding: {
    paddingHorizontal: 20,
  },
  flatList: {
    paddingTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SelectSymptom;
