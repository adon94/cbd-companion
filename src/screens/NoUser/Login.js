import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { signIn } from '../../api/auth';

import Layout from '../../components/Layout';
import KeyboardAvoiding from '../../components/KeyboardAvoiding';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import Label from '../../components/Label';

import { emailValidator, passwordValidator } from '../../core/utils';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    signIn({ email: email.value, password: password.value });
  };

  return (
    <Layout>
      <KeyboardAvoiding container>
        <BackButton onPress={() => navigation.goBack()} />

        <View style={styles.headerContainer}>
          {/* <Logo /> */}
          <Header centered>Welcome back</Header>
        </View>

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

        <View style={styles.forgotPassword}>
          <Label onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot your password?
          </Label>
        </View>

        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>

        <View style={styles.row}>
          <Label>Don’t have an account? </Label>
          <Label onPress={() => navigation.navigate('Register')}>Sign up</Label>
        </View>
      </KeyboardAvoiding>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default memo(Login);
