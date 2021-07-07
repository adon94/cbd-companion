import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomBarChart from '../../components/charts/BarChart';

const baseData = { average: 0, dataQuantity: 0, totalValue: 0 };

const DaysOfWeek = ({ moods }) => {
  const [xAxisData, setXAxisData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = [
      { ...baseData }, // mon
      { ...baseData },
      { ...baseData },
      { ...baseData },
      { ...baseData },
      { ...baseData },
      { ...baseData }, // sun
    ];
    setData(d);
    moods.forEach((mood) => {
      const dayOfWeek = new Date(mood.timestamp).getDay();
      const index = dayOfWeek - 1;
      const datapoint = d[index];

      datapoint.totalValue += mood.rating;
      datapoint.dataQuantity += 1;
      datapoint.average = datapoint.totalValue / datapoint.dataQuantity;
    });
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    setData(d);
    setXAxisData(
      days.map((day, i) => ({
        day,
        doseMg: `(${d[i].dataQuantity})`,
      })),
    );
  }, [moods]);

  return (
    <View>
      <View>
        <Text style={styles.titleText}>Averages for each day of the week</Text>
      </View>
      <CustomBarChart data={data} xAxisData={xAxisData} />
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
});

export default DaysOfWeek;
