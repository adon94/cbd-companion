import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, Path } from 'react-native-svg';
import { getDayName, timeDisplay } from '../../../core/utils';
import { theme } from '../../../core/theme';
import { ratingReps } from '../../../core/constants';

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

const Stats = ({ moods, average }) => {
  const formatLabel = (y) => {
    return y % 1 === 0 && y < 5 ? ratingReps[parseInt(y, 10) - 1] : '';
  };
  const data = moods.map((mood) => mood.rating); // dont forget
  const contentInset = { top: 20, bottom: 20 };
  const xAxisHeight = 30;
  const xAxisData = average
    ? moods.map((mood) => getDayName(mood.date)) // dateDisplay(mood.date, 'short'))
    : moods.map((mood) => timeDisplay(mood.timestamp)); // also this

  return (
    <View style={styles.container}>
      {moods.length > 0 && (
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={[1, 2, 3, 4]}
            contentInset={contentInset}
            svg={{
              fill: theme.colors.accent,
              fontSize: 20,
            }}
            numberOfTicks={4}
            formatLabel={formatLabel}
            style={{ marginBottom: xAxisHeight }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <AreaChart
              yMax={4}
              yMin={1}
              numberOfTicks={4}
              style={{ flex: 1 }}
              data={data}
              contentInset={contentInset}
              curve={shape.curveNatural}
              svg={{ fill: '#f0f0f04D' }}>
              <Grid svg={{ stroke: '#ffffff4D' }} />
              <Line />
              <Decorator />
            </AreaChart>
            <XAxis
              style={{
                marginHorizontal: -10,
                height: xAxisHeight,
                paddingTop: 10,
              }}
              data={xAxisData}
              formatLabel={(index) => xAxisData[index]}
              contentInset={{ left: 25, right: 25 }}
              svg={{ fontSize: 10, fill: '#fff' }}
            />
          </View>
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
