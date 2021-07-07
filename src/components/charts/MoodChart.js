import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Text } from 'react-native';
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, Path } from 'react-native-svg';
import XAxis from './XAxis';
import { getDayName, timeDisplay, numericDate } from '../../core/utils';
import { theme } from '../../core/theme';
import { ratingReps } from '../../core/constants';

const screenWidth = Dimensions.get('window').width;

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)} // this
      r={4}
      stroke={theme.colors.primary}
      fill={'white'}
    />
  ));
};

const Line = ({ line }) => (
  <Path d={line} stroke={theme.colors.primary} fill={'none'} />
);

const MoodChart = ({ moods, average, displayDay }) => {
  const formatLabel = (y) => {
    return y % 1 === 0 && y < 6 ? ratingReps[parseInt(y, 10) - 1] : '';
  };
  const data = moods.map((mood) => mood.rating); // dont forget
  const contentInset = { top: 20, bottom: 20 };
  const xAxisHeight = 30;
  // const xAxisData = average
  //   ? moods.map((mood) => (displayDay ? getDayName(mood.date) : numericDate(mood.date)) // dateDisplay(mood.date, 'short'))
  //   : moods.map((mood) => timeDisplay(mood.timestamp)); // also this
  let xAxisData;
  if (average && displayDay) {
    xAxisData = moods.map(({ timestamp, doseMg }) => ({
      day: getDayName(timestamp),
      doseMg: `${doseMg || 'N/A'}`,
    }));
  } else if (average) {
    xAxisData = moods.map((mood) => ({ day: numericDate(mood.timestamp) }));
  } else {
    xAxisData = moods.map((mood) => ({ day: timeDisplay(mood.timestamp) }));
  }

  const scrollView = useRef(null);

  return (
    <View style={styles.container}>
      {moods.length > 0 && (
        <View style={{ flexDirection: 'row' }}>
          <YAxis
            data={[1, 2, 3, 4, 5]}
            contentInset={contentInset}
            svg={{
              fill: theme.colors.accent,
              fontSize: 20,
            }}
            numberOfTicks={4}
            formatLabel={formatLabel}
            style={{ marginBottom: xAxisHeight }}
          />
          <ScrollView
            horizontal
            ref={scrollView}
            onContentSizeChange={() =>
              scrollView.current.scrollToEnd({ animated: true })
            }>
            <View
              style={[
                styles.chartContainer,
                {
                  width: data.length > 7 ? data.length * 45 : screenWidth - 60,
                },
              ]}>
              <AreaChart
                yMax={5}
                yMin={1}
                numberOfTicks={5}
                style={{ flex: 1 }}
                data={data}
                contentInset={contentInset}
                curve={shape.curveNatural}
                svg={{ fill: '#f0f0f04D' }}>
                <Grid svg={{ stroke: '#ffffff4D' }} />
                <Line />
                <Decorator />
              </AreaChart>
              <XAxis data={xAxisData} labels={['day', 'doseMg']} />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  chartContainer: {
    flex: 1,
    marginLeft: 10,
    height: 200,
  },
});

export default MoodChart;
