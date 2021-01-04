import React, { memo } from 'react';
import { View, StyleSheet, Text, TextInput as Input } from 'react-native';
// import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

const TextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      style={[styles.input, props.disabled && styles.disabled]}
      selectionColor={theme.colors.primary}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.primary,
    height: 50,
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  disabled: {
    backgroundColor: '#E5E5E5',
    color: '#888888',
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
