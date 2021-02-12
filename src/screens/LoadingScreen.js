import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
// import { Spinner } from 'native-base';

import Layout from '../components/Layout';

const LoadingScreen = () => (
  <Layout centered>
    <SafeAreaView>
      {/* <Spinner color="#fff" /> */}
      <ActivityIndicator color="#fff" />
    </SafeAreaView>
  </Layout>
);

export default LoadingScreen;
