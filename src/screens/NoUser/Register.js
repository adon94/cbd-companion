import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { registerUser } from '../../api/auth';

import KeyboardAvoiding from '../../components/KeyboardAvoiding';
import Layout from '../../components/Layout';
import Label from '../../components/Label';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';

const Register = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    registerUser({ email: email.value, password: password.value });
    // navigation.navigate('Dashboard');
  };

  return (
    <Layout>
      <KeyboardAvoiding container>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.headerContainer}>
          {/* <Logo /> */}
          <Header>Create Account</Header>
        </View>

        <TextInput
          placeholder="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="words"
        />

        <TextInput
          placeholder="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}>
          Sign Up
        </Button>

        <View style={styles.row}>
          <Label>Already have an account? </Label>
          <Label onPress={() => navigation.navigate('Login')}>Login</Label>
        </View>
      </KeyboardAvoiding>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default memo(Register);
