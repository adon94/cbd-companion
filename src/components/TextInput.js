import React, { memo } from 'react';
import { View, StyleSheet, Text, TextInput as Input } from 'react-native';

import { theme } from '../core/theme';

const TextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      style={[styles.input, props.disabled && styles.disabled]}
      selectionColor={theme.colors.primary}
      placeholderTextColor="#ffffff99"
      editable={!props.disabled}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  input: {
    // backgroundColor: theme.colors.surface,
    color: '#fff',
    height: 50,
    borderRadius: 4,
    // paddingHorizontal: 10,
    fontSize: 18,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  disabled: {
    // backgroundColor: '#E5E5E5',
    opacity: 0.5,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
