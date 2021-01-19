import React, { memo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const Button = ({ mode, style, fullWidth, children, ...props }) => (
  <PaperButton
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
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    marginVertical: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: windowWidth / 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default memo(Button);
