import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import CbdDetails from '../../../components/Onboarding/CbdDetails';
import Button from '../../../components/Button';
import { setDoseInfo } from '../../../reducers/doseReducer';

// import { addOnboardInfo } from '../../../api/database';
// import { setOnboarded } from '../../../reducers/userReducer';

const AddProduct = ({ navigation }) => {
  const doseInfo = useSelector((state) => state.dose.doseInfo);
  const dispatch = useDispatch();

  const [cbdDetails, setCbdDetails] = useState(doseInfo);

  const submit = async () => {
    // await addOnboardInfo(symptoms, cbdDetails);
    // dispatch(setOnboarded(true));
    dispatch(setDoseInfo(cbdDetails));
    navigation.goBack();
  };

  return (
    <Layout noSafeView>
      <SafeAreaView style={styles.container}>
        <Header>What CBD are you taking?</Header>
        <CbdDetails cbdDetails={cbdDetails} setCbdDetails={setCbdDetails} />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <Button cancel onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button onPress={submit}>Done</Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  container: {
    margin: 20,
    marginTop: 80,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default AddProduct;
