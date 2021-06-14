import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { theme } from '../core/theme';

const windowWidth = Dimensions.get('window').width;

const RatingButton = ({
  isLifestyle,
  isMeasurement,
  active,
  onPress,
  children,
}) => {
  const boxSize = isLifestyle ? 60 : 40;

  return (
    <TouchableOpacity
      style={[
        styles.feelBox,
        active && styles.activeBox,
        !isMeasurement && { width: boxSize, height: boxSize },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.feelText,
          active && styles.activeText,
          isMeasurement && styles.smallText,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  feelBox: {
    // backgroundColor: '#f0f0f04D',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  activeBox: {
    backgroundColor: '#009432',
  },
  activeText: {
    color: '#fff',
  },
  feelText: {
    // color: '#ffffff',
    color: theme.colors.primary,
    fontSize: windowWidth / 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 18,
    margin: 5,
    // fontWeight: 'normal',
  },
});

export default RatingButton;
