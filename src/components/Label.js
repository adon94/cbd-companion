import React, { memo } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const Label = ({ children, onPress }) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.label, styles.link]}>{children}</Text>
      </TouchableOpacity>
    );
  }

  return <Text style={styles.label}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: windowWidth / 25,
    color: theme.colors.accent,
  },
  link: {
    // color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default memo(Label);
