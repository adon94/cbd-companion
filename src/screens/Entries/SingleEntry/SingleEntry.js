import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import Layout from '../../../components/Layout';
import BackButton from '../../../components/BackButton';

import { dateDisplay } from '../../../core/utils';
import { getFactorsOnDay } from '../../../api/database';
import { theme } from '../../../core/theme';
import ScrollHeader from '../../../components/ScrollHeader';
import RatingButton from '../../../components/RatingButton';
import Header from '../../../components/Header';

const HEADER_MIN_HEIGHT = 80;

const SingleEntry = ({ route: { params: item }, navigation }) => {
  const average = item.rating;
  const [factors, setFactors] = useState([]);

  useEffect(() => {
    async function fetchFactors() {
      const result = await getFactorsOnDay(item.id);
      setFactors(result);
    }
    fetchFactors();
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <Layout>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollHeader
        scrollY={scrollY}
        header={item.symptomName}
        title={dateDisplay(item.timestamp)}
      />
      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
          { useNativeDriver: true }, // use native driver for animation
        )}>
        <View style={styles.badge}>
          <Text style={styles.regularText}>Rating: {average}</Text>
        </View>
        <Header sm>Dosage:</Header>
        <View style={styles.badge}>
          <Text style={styles.regularText}>{item.doseMg}ml</Text>
          <Text style={styles.regularText}>{item.product}</Text>
          <Text style={styles.regularText}>{item.brand}</Text>
        </View>
        <Header sm style={styles.factorHeader}>
          Lifestyle Factors:
        </Header>
        <View style={styles.factorsContainer}>
          {factors.length > 0 &&
            factors.map((factor) => (
              <View style={styles.factorItem} key={factor.displayName}>
                <Text style={styles.factorText}>{factor.displayName}</Text>
                <RatingButton isLifestyle>
                  {factor.rating === 2 ? 'Yes' : 'No'}
                </RatingButton>
              </View>
            ))}
        </View>
      </Animated.ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 0,
    marginTop: HEADER_MIN_HEIGHT, // min height of headerContainer
    paddingTop: 40,
  },
  factorsContainer: {
    paddingBottom: 40,
  },
  factorHeader: {
    marginTop: 15,
  },
  factorItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  regularText: {
    fontSize: 22,
    color: theme.colors.accent,
  },
  badge: {
    backgroundColor: '#f0f0f04D',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  factorText: {
    marginTop: 20,
    fontSize: 22,
    color: theme.colors.accent,
    textAlign: 'center',
  },
});

export default SingleEntry;
