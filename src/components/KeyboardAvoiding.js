import React from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';

const KeyboardAvoiding = ({ children, container }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.keyboardAvoiding, container && styles.container]}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
  },
});

export default KeyboardAvoiding;
