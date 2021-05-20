import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFactorsCountByRating } from '../../api/database';

const LifestyleCorrelation = ({ moods }) => {
  const [factors, setFactors] = useState([]);

  const convertKey = (str) => {
    const key = str.split('Did ')[1].split(' today?')[0];
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  useEffect(() => {
    async function getData() {
      const data = await getFactorsCountByRating('5', 'Anxiety Relief');
      const factorsArray = [];
      for (const [key, value] of Object.entries(data)) {
        factorsArray.push({
          key: convertKey(key),
          value,
        });
        console.log(`${key.split('Did ')[1].split(' today?')[0]}: ${value}`);
      }
      setFactors(factorsArray);
    }
    getData();
  }, [moods]);

  return (
    <View>
      <View>
        <Text style={styles.titleText}>You feel best when:</Text>
        {factors &&
          factors.map(({ key, value }) => (
            <Text key={key} style={styles.factorText}>
              {key} ({value} times)
            </Text>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  factorText: {
    color: '#ffffff',
  },
});

export default LifestyleCorrelation;
