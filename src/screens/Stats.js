import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { LineChart, ContributionGraph } from 'react-native-chart-kit';

import Layout from '../components/Layout';

import { getMoods } from '../api/database';

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(86, 171, 47, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(86, 171, 47, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#a4de8a',
  },
};

const Stats = () => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const moodData = await getMoods();
      setDays(moodData);
    }
    fetchData();
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>My Stats</Text>
        {days.length > 0 && (
          <>
            <LineChart
              data={{
                labels: days.map((m, i) => `Day ${i + 1}`),
                datasets: [
                  {
                    data: days.map((m) => m.average),
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={3} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <ContributionGraph
              values={days.map((m, i) => ({
                date: `2020-10-${27 - i}`,
                count: m.average,
              }))}
              endDate={new Date('2020-10-31')}
              numDays={105}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
              }}
            />
          </>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
    marginVertical: 50,
  },
  title: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Stats;
