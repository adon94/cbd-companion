import React from 'react';
import { SafeAreaView } from 'react-native';
import { Spinner } from 'native-base';

import Layout from '../components/Layout';

const LoadingScreen = () => (
  <Layout centered>
    <SafeAreaView>
      <Spinner color="#fff" />
    </SafeAreaView>
  </Layout>
);

export default LoadingScreen;
