import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import Button from '../../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import RatingButton from '../../../components/RatingButton';
import Header from '../../../components/Header';

import { setMeasurement } from '../../../reducers/doseReducer';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const measurements = ['mg', 'ml', 'drops'];

const MyPicker = ({
  values,
  setValue,
  show,
  hide,
  selectedValue,
  showOption,
}) => {
  const measurement = useSelector((state) => state.dose.last.measurement);
  const dispatch = useDispatch();

  if (!show) {
    return null;
  }

  const onMeasurementSelect = (type) => {
    dispatch(setMeasurement(type));
  };

  return (
    <LinearGradient colors={[topColor, bottomColor]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header>What was your dose?</Header>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          itemStyle={styles.itemStyle}
          selectedValue={selectedValue}
          onValueChange={(itemValue, index) => setValue(itemValue, index)}>
          {values.map((val, index) => (
            <Picker.Item
              key={val}
              label={`${val} ${
                index === 0 && measurement === 'drops' ? 'drop' : measurement
              }`}
              value={val}
            />
          ))}
        </Picker>
        {showOption && (
          <View style={styles.buttonsContainer}>
            {measurements.map((type) => (
              <RatingButton
                key={type}
                active={type === measurement}
                isMeasurement
                onPress={() => onMeasurementSelect(type)}>
                {type}
              </RatingButton>
            ))}
          </View>
        )}
      </View>
      <Button style={{ marginTop: 'auto' }} onPress={hide}>
        Done
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    height: screenHeight - 100,
    width: screenWidth,
    paddingTop: 90,
  },
  headerContainer: {
    paddingHorizontal: 20,
    width: '80%',
  },
  pickerContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  itemStyle: {
    color: '#fff',
  },
  touchText: {
    alignItems: 'center',
    marginBottom: -40,
    marginTop: 40,
  },
  smallTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.8,
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MyPicker;
