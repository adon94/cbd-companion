import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Layout from '../../components/Layout';
import SymptomInput from '../../components/Symptoms/SymptomInput';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CbdDetails from '../../components/CbdDetails';
import { theme } from '../../core/theme';

import { addOnboardInfo } from '../../api/database';

const Onboarding = ({ setOnboarded }) => {
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  const [symptoms, setSymptoms] = useState({
    anxiety: false,
    sleep: false,
    epilepsy: false,
    chronicPain: false,
  });

  const [cbdDetails, setCbdDetails] = useState({
    brandName: '',
    mg: '',
  });

  const submit = async () => {
    const symptomsArr = [];
    if (symptoms.anxiety) {
      symptomsArr.push('Anxiety');
    }
    if (symptoms.sleep) {
      symptomsArr.push('Sleep');
    }
    if (symptoms.epilepsy) {
      symptomsArr.push('Epilepsy');
    }
    if (symptoms.chronicPain) {
      symptomsArr.push('Chronic Pain');
    }

    await addOnboardInfo(symptomsArr, cbdDetails);
    setOnboarded(true);
  };

  return (
    <View style={styles.full}>
      <ViewPager initialPage={0} ref={pagerRef} style={styles.full}>
        <View key="1">
          <Layout>
            <View style={styles.container}>
              <Header>What would you like to improve?</Header>
              <SymptomInput symptoms={symptoms} setSymptoms={setSymptoms} />
            </View>
            <Footer
              backgroundColor={theme.colors.primary}
              rightButtonLabel="Next"
              rightButtonPress={() => handlePageChange(1)}
            />
          </Layout>
        </View>
        <View key="2">
          <Layout>
            <View style={styles.container}>
              <Header>What CBD are you taking?</Header>
              <CbdDetails
                cbdDetails={cbdDetails}
                setCbdDetails={setCbdDetails}
              />
            </View>
            <Footer
              backgroundColor={theme.colors.primary}
              leftButtonLabel="Back"
              leftButtonPress={() => handlePageChange(0)}
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
    padding: 20,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Onboarding;
