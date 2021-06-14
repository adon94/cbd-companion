import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Button from '../../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import RatingButton from '../../../components/RatingButton';
import Header from '../../../components/Header';

const topColor = '#56ab2f';
const bottomColor = '#a8e063';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const MyPicker = ({
  values,
  setValue,
  show,
  hide,
  selectedValue,
  showOption,
}) => {
  const [showMeasurement, setShowMeasurement] = useState();
  if (!show) {
    return null;
  }

  return (
    <LinearGradient colors={[topColor, bottomColor]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header>What was your dose?</Header>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          itemStyle={styles.itemStyle}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
          {values.map((val) => (
            <Picker.Item key={val} label={val} value={val} />
          ))}
        </Picker>
        {showOption && (
          <View style={styles.buttonsContainer}>
            {['mg', 'ml', 'drops'].map((type) => (
              <RatingButton
                key={type}
                // active={index + 1 === rating}
                isMeasurement
                onPress={() => console.log(type)}>
                {type}
              </RatingButton>
            ))}
          </View>
        )}
      </View>
      <Button style={{ marginTop: 'auto' }} onPress={hide}>
        Done
      </Button>
      {/* <MyPicker
        values={['Ml', 'Drops', 'Mg']}
        setValue={(v) => console.log({ v })}
        show={show}
        hide={() => setShowMeasurement(false)}
        selectedValue={'Drops'}
      /> */}
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
