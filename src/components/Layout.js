import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

const Layout = ({ children, container, style, centered }) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={topColor}
        barStyle="light-content"
      />
      <LinearGradient
        colors={[topColor, bottomColor]}
        style={[
          styles.linearGradient,
          container && styles.container,
          centered && styles.centered,
          style && style,
        ]}>
        <SafeAreaView style={styles.body}>{children}</SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Layout;
