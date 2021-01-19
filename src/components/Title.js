import React, { memo } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const Title = ({ children, centered }) => (
  <Text style={[styles.title, centered && styles.centered]}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: windowWidth / 23,
    color: theme.colors.accent,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  centered: {
    textAlign: 'center',
  },
});

export default memo(Title);
