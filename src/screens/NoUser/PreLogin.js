import React, { memo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

const screenHeight = Dimensions.get('window').height;

const PreLogin = ({ navigation }) => (
  <Layout style={styles.layoutContainer} container centered>
    {/* <Logo /> */}
    <Header centered>CBD Journey</Header>

    <Paragraph>The CBD Journalling App</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
      Register
    </Button>
  </Layout>
);

const styles = StyleSheet.create({
  layoutContainer: {
    justifyContent: 'center',
    height: screenHeight,
  },
});

export default memo(PreLogin);
