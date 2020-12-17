import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    color: theme.colors.accent,
    fontWeight: 'bold',
    paddingVertical: 50,
  },
});

export default memo(Header);
