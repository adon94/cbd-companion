import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomBarChart from '../../components/charts/BarChart';
import { getDayName } from '../../core/utils';

const baseData = { average: 0, dataQuantity: 0, totalValue: 0 };

const data = [
  { ...baseData }, // mon
  { ...baseData },
  { ...baseData },
  { ...baseData },
  { ...baseData },
  { ...baseData },
  { ...baseData }, // sun
];

const GoalLifestyle = () => {
  const viewingSymptom = useSelector((state) => state.viewingSymptom);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const lifestyle = useSelector((state) => state.lifestyle.lifestyle); // last thing
  const moods = useSelector((state) => state.moods.moods);
  moods.forEach((mood) => {
    const dayOfWeek = new Date(mood.date).getDay();
    const index = dayOfWeek - 1;
    const datapoint = data[index];

    datapoint.totalValue += mood.rating;
    datapoint.dataQuantity += 1;
    datapoint.average = datapoint.totalValue / datapoint.dataQuantity;
  });

  const xAxisData = ['Mon', 'Tues', 'Wed', 'Thurs', 'Friday', 'Sat', 'Sun'];

  return (
    <View>
      <View>
        <Text style={styles.titleText}>Goals and Lifestyle</Text>
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

export default GoalLifestyle;
