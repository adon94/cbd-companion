import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Ionicons name="arrow-back" size={35} color="#ffffff" />
    {/* <Image style={styles.image} source={require('../assets/arrow_back.png')} /> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
