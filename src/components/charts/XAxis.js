import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const XAxis = ({ data, labels, bar }) => {
  return (
    <View style={[styles.xAxis, bar && styles.bar]}>
      {data.map((x, i) => (
        <View
          key={x.day}
          style={[
            styles.xTextContainer,
            !bar && i === 0 && styles.first,
            !bar && i === data.length - 1 && styles.last,
          ]}>
          <Text style={styles.xText}>{x[labels[0]]}</Text>
          {labels[1] && <Text style={styles.xText}>{x[labels[1]]}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xTextContainer: {
    alignItems: 'center',
  },
  first: {
    alignItems: 'flex-start',
  },
  last: {
    alignItems: 'flex-end',
  },
  xText: {
    fontSize: 12,
    color: '#fff',
  },
  bar: {
    justifyContent: 'space-evenly',
  },
});

export default XAxis;
