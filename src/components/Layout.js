import { View } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

const Layout = ({ children, container, style, centered, noSafeView }) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={topColor}
        barStyle="light-content"
      />
      <LinearGradient colors={[topColor, bottomColor]} style={styles.body}>
        {noSafeView ? (
          <View
            style={[
              styles.body,
              container && styles.container,
              centered && styles.centered,
              style && style,
            ]}>
            {children}
          </View>
        ) : (
          <SafeAreaView
            style={[
              styles.body,
              container && styles.container,
              centered && styles.centered,
              style && style,
            ]}>
            {children}
          </SafeAreaView>
        )}
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
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
