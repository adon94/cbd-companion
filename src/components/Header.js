import React, { memo } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const Header = ({ children, centered, lg, sm, onLayout, style }) => (
  <Text
    onLayout={onLayout}
    style={[
      styles.header,
      centered && styles.centered,
      lg && styles.large,
      sm && styles.small,
      style && style,
    ]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: windowWidth / 10,
    color: theme.colors.accent,
    fontWeight: 'bold',
  },
  centered: {
    textAlign: 'center',
  },
  large: {
    fontSize: windowWidth / 8,
  },
  small: {
    fontSize: windowWidth / 14,
  },
});

export default memo(Header);
