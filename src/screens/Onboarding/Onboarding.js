import React, { useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
import SymptomInput from '../../components/Symptoms/SymptomInput';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CbdDetails from '../../components/CbdDetails';

import { addOnboardInfo } from '../../api/database';
import ds from './defaultSymptoms';
import { setOnboarded } from '../../reducers/userReducer';

const Onboarding = ({ navigation }) => {
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const dispatch = useDispatch();

  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  const [defaultSymptoms, setDefaultSymptoms] = useState(ds);

  const [cbdDetails, setCbdDetails] = useState({
    brandName: '',
    mg: '',
    ml: '',
  });

  const submit = async () => {
    await addOnboardInfo(symptoms, cbdDetails);
    dispatch(setOnboarded(true));
  };

  return (
    <View style={styles.full}>
      <ViewPager initialPage={0} ref={pagerRef} style={styles.full}>
        <View style={styles.full} key="1">
          <Layout noSafeView>
            <SafeAreaView style={styles.container}>
              <Header>What would you like to improve?</Header>
              <SymptomInput
                defaultSymptoms={defaultSymptoms}
                setDefaultSymptoms={setDefaultSymptoms}
                navigation={navigation}
              />
            </SafeAreaView>
            <Footer
              backgroundColor="transparent"
              rightButtonLabel="Next"
              rightButtonPress={() => handlePageChange(1)}
            />
          </Layout>
        </View>
        <View style={styles.full} key="2">
          <Layout noSafeView>
            <SafeAreaView style={styles.container}>
              <Header>Notifications?</Header>
              {/* Enable notifications */}
            </SafeAreaView>
            <Footer
              backgroundColor="transparent"
              leftButtonLabel="Back"
              leftButtonPress={() => handlePageChange(0)}
              rightButtonLabel="Next"
              rightButtonPress={() => handlePageChange(2)}
            />
          </Layout>
        </View>
        <View style={styles.full} key="3">
          <Layout noSafeView>
            <SafeAreaView style={styles.container}>
              <Header>What CBD are you taking?</Header>
              <CbdDetails
                cbdDetails={cbdDetails}
                setCbdDetails={setCbdDetails}
              />
            </SafeAreaView>
            <Footer
              backgroundColor="transparent"
              leftButtonLabel="Back"
              leftButtonPress={() => handlePageChange(1)}
              rightButtonLabel="Continue"
              rightButtonPress={submit}
            />
          </Layout>
        </View>
      </ViewPager>
    </View>
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
});

export default Onboarding;
