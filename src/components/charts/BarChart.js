import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

const screenWidth = Dimensions.get('window').width;

const CustomBarChart = ({ data, xAxisData }) => {
  const fill = '#ffffff99';
  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ height: 200, flexDirection: 'row' }}>
      <YAxis
        data={[1, 2, 3, 4]}
        contentInset={contentInset}
        svg={{
          fill: '#fff',
          fontSize: 20,
        }}
        numberOfTicks={4}
      />
      <View>
        <BarChart
          yMax={4}
          yMin={1}
          numberOfTicks={4}
          style={{ height: 200, width: screenWidth - 70, marginLeft: 10 }}
          data={data}
          yAccessor={({ item }) => parseFloat(item.average.toFixed(2))}
          svg={{ fill }}
          contentInset={contentInset}>
          <Grid />
        </BarChart>

        <XAxis
          style={{
            marginHorizontal: -10,
            height: 30,
            paddingTop: 10,
          }}
          data={xAxisData}
          formatLabel={(index) => xAxisData[index]}
          contentInset={{ left: 25, right: 25 }}
          svg={{ fontSize: 10, fill: '#fff' }}
        />
      </View>
    </View>
  );
};

export default CustomBarChart;
