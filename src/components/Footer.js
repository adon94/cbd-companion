/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';

import RoundedButton from './RoundedButton';

const Footer = ({
  backgroundColor,
  leftButtonLabel = false,
  leftButtonPress = false,
  rightButtonLabel = false,
  rightButtonPress = false,
}) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.18;
  const FOOTER_PADDING = windowWidth * 0.1;

  return (
    <View
      style={[
        styles.footerContainer,
        {
          justifyContent: leftButtonLabel ? 'space-between' : 'flex-end',
          height: HEIGHT,
          backgroundColor,
          paddingHorizontal: FOOTER_PADDING,
        },
      ]}>
      {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )}
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    // opacity: 0.6,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Footer;
