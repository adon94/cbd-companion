import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { AreaChart, Grid, YAxis, LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, Path } from 'react-native-svg';
import { timeDisplay } from '../../../core/utils';
import { theme } from '../../../core/theme';

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

const emojis = ['😓', '😓', '😕', '🙂', '😁'];

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={4}
      stroke={theme.colors.primary}
      fill={'white'}
    />
  ));
};

const Line = ({ line }) => (
  <Path d={line} stroke={theme.colors.primary} fill={'none'} />
);

const Stats = ({ moods }) => {
  const formatLabel = (y) => {
    return y % 1 === 0 && y < 5 ? emojis[parseInt(y, 10)] : '';
  };
  const data = moods.map((mood) => mood.rating);
  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={styles.container}>
      {moods.length > 0 && (
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={[1, 2, 3, 4]}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 20,
            }}
            numberOfTicks={4}
            formatLabel={formatLabel}
          />
          {/* <LineChart
            yMax={4}
            yMin={1}
            numberOfTicks={4}
            style={{ flex: 1, marginLeft: 16 }}
            data={data}
            curve={shape.curveNatural}
            svg={{ stroke: theme.colors.primary }}
            contentInset={contentInset}>
            <Decorator />
          </LineChart> */}
          <AreaChart
            yMax={4}
            yMin={1}
            numberOfTicks={4}
            style={{ flex: 1, marginLeft: 16 }}
            data={data}
            contentInset={contentInset}
            curve={shape.curveNatural}
            svg={{ fill: '#f0f0f04D' }}>
            <Grid svg={{ stroke: '#ffffff4D' }} />
            <Line />
            <Decorator />
          </AreaChart>
        </View>
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
