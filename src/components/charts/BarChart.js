import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { theme } from '../../core/theme';
import XAxis from './XAxis';

const screenWidth = Dimensions.get('window').width;

const CustomBarChart = ({ data, xAxisData }) => {
  const fill = theme.colors.accent;
  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ marginBottom: 25, flexDirection: 'row' }}>
      <YAxis
        data={[1, 2, 3, 4, 5]}
        contentInset={contentInset}
        svg={{
          fill: '#fff',
          fontSize: 20,
        }}
        numberOfTicks={4}
      />
      <View>
        <BarChart
          yMax={5}
          yMin={1}
          numberOfTicks={5}
          style={{ height: 200, width: screenWidth - 70, marginLeft: 10 }}
          data={data}
          yAccessor={({ item }) => parseFloat(item.average.toFixed(2))}
          svg={{ fill }}
          contentInset={contentInset}>
          <Grid />
        </BarChart>

        <XAxis data={xAxisData} labels={['day', 'doseMg']} bar />
      </View>
    </View>
  );
};

export default CustomBarChart;
