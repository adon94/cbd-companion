import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children, centered }) => (
  <Text style={[styles.header, centered && styles.centered]}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    color: theme.colors.accent,
    fontWeight: 'bold',
    // paddingVertical: 50,
  },
  centered: {
    textAlign: 'center',
  },
});

export default memo(Header);
