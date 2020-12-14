import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

const Layout = ({ children, container }) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={topColor}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.body}>
        <LinearGradient
          colors={[topColor, bottomColor]}
          style={[styles.linearGradient, container && styles.container]}>
          {children}
        </LinearGradient>
      </SafeAreaView>
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
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Layout;
