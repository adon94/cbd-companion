import React, { memo } from 'react';
import Layout from '../../components/Layout';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

const PreLogin = ({ navigation }) => (
  <Layout container>
    <Logo />
    <Header>Buddy</Header>

    <Paragraph>The essential CDB companion</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
      Sign Up
    </Button>
  </Layout>
);

export default memo(PreLogin);
