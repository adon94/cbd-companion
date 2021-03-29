import React, { memo } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const Button = ({ mode, style, fullWidth, children, ...props }) => (
  <TouchableOpacity
    style={[
      styles.button,
      mode === 'outlined'
        ? { backgroundColor: theme.colors.surface }
        : { backgroundColor: theme.colors.backdrop },
      fullWidth && styles.fullWidth,
      style,
    ]}
    labelStyle={[
      styles.text,
      mode === 'outlined' && { color: theme.colors.backdrop },
    ]}
    mode={mode}
    {...props}>
    <Text
      style={[
        styles.text,
        mode === 'outlined' && { color: theme.colors.backdrop },
      ]}>
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    marginVertical: 10,
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  text: {
    color: '#ffffff',
    fontSize: windowWidth / 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default memo(Button);
