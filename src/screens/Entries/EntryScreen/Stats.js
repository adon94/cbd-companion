import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ratingReps } from '../../../core/constants';
import { timeDisplay } from '../../../core/utils';

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

const Stats = ({ moods }) => {
  const formatLabel = (y) => {
    return y % 1 === 0 && y < 5 ? ratingReps[parseInt(y, 10) - 1] : '';
  };

  return (
    <View style={styles.container}>
      {moods.length > 0 && (
        <LineChart
          formatYLabel={formatLabel}
          segments={3}
          data={{
            labels: moods.map((m, i) => timeDisplay(m.timestamp)),
            datasets: [
              {
                data: moods.map((m) => m.rating),
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          XAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    marginVertical: 20,
  },
});

export default Stats;
