import React, { memo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

const screenHeight = Dimensions.get('window').height;

const PreLogin = ({ navigation }) => (
  <Layout style={styles.layoutContainer} container centered>
    <Logo />
    <Header centered>Buddy</Header>

    <Paragraph>The essential CDB companion</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
      Sign Up
    </Button>
  </Layout>
);

const styles = StyleSheet.create({
  layoutContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'blue',
    height: screenHeight,
  },
});

export default memo(PreLogin);
