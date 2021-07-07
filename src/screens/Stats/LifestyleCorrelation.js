import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getFactorsCountByRating } from '../../api/database';

const LifestyleCorrelation = ({ moods }) => {
  const viewingSymptom = useSelector((state) => state.viewingSymptom);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const [factors, setFactors] = useState([]);
  const [total, setTotal] = useState(0);

  const convertKey = (str) => {
    const key = str.split('Did you')[1].split(' today?')[0];
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  useEffect(() => {
    async function getData() {
      const data = await getFactorsCountByRating(
        '5',
        symptoms[viewingSymptom].displayName,
      );
      const factorsArray = [];
      for (const [key, value] of Object.entries(data)) {
        if (key !== 'total') {
          factorsArray.push({
            key: convertKey(key),
            value,
          });
        } else {
          setTotal(value);
        }
      }
      setFactors(factorsArray);
    }
    getData();
  }, [moods, viewingSymptom, symptoms]);

  return (
    <View>
      <View>
        <Text style={styles.titleText}>You feel best when you:</Text>
        {factors &&
          factors.map(({ key, value }) => (
            <Text key={key} style={styles.factorText}>
              {key} ({Math.round((value / total) * 100)}%)
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
