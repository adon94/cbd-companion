import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined'
        ? { backgroundColor: theme.colors.surface }
        : { backgroundColor: theme.colors.backdrop },
      style,
    ]}
    labelStyle={[
      styles.text,
      mode === 'outlined' && { color: theme.colors.backdrop },
    ]}
    mode={mode}
    {...props}>
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default memo(Button);
