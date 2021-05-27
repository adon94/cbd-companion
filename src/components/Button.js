import React, { memo } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const Button = ({
  outlined,
  style,
  fullWidth,
  children,
  capitalize,
  cancel,
  ...props
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      outlined && { backgroundColor: theme.colors.semiTransparent },
      //   : { backgroundColor: theme.colors.backdrop },
      fullWidth && styles.fullWidth,
      style,
    ]}
    labelStyle={[
      styles.text,
      // mode === 'outlined' && { color: theme.colors.backdrop },
    ]}
    // mode={mode}
    {...props}>
    <Text
      style={[
        styles.text,
        capitalize && { textTransform: 'none' },
        outlined && { color: '#fff' },
        cancel && { color: theme.colors.error },
        // mode === 'outlined' && { color: theme.colors.backdrop },
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
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  text: {
    color: theme.colors.primary,
    fontSize: windowWidth / 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default memo(Button);
