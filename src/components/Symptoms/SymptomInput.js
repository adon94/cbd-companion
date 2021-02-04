import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { theme } from '../../core/theme';
import { addNewSymptom, setNewSymptoms } from '../../actions';

const Row = ({ symptom, onPress, icon }) => {
  return (
    <View style={styles.rowContainer} key={symptom.displayName}>
      <View style={styles.plainTextButton}>
        <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
          <Ionicons name={icon} size={35} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.plainText}>{symptom.displayName}</Text>
      </View>
    </View>
  );
};

const SymptomInput = ({ defaultSymptoms, setDefaultSymptoms, navigation }) => {
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const dispatch = useDispatch();

  const addToDefault = (symp) => {
    setDefaultSymptoms(defaultSymptoms.concat([symp]));
  };

  const addSymptom = (symp, index) => {
    const newArr = [...defaultSymptoms];
    newArr.splice(index, 1);
    setDefaultSymptoms(newArr);
    dispatch(addNewSymptom(symp.displayName));
  };

  const removeSymptom = (symp, i) => {
    const newArr2 = [...symptoms];
    newArr2.splice(i, 1);
    dispatch(setNewSymptoms(newArr2));

    addToDefault(symp);
  };

  return (
    <View style={styles.container}>
      {symptoms.length > 0 && (
        <FlatList
          data={symptoms}
          renderItem={({ item, index }) => (
            <Row
              key={item.displayName}
              symptom={item}
              onPress={() => removeSymptom(item, index)}
              icon="remove"
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      <FlatList
        data={defaultSymptoms}
        renderItem={({ item, index }) => (
          <Row
            key={item.displayName}
            symptom={item}
            onPress={() => addSymptom(item, index)}
            icon="add"
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('NewSymptom')}
        style={styles.plainTextButton}>
        <View style={styles.iconContainer}>
          <Ionicons name="add-circle-outline" size={40} color="#ffffff" />
        </View>
        <Text style={styles.plainText}>Something else</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  contentContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.accent,
  },
  plainTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  plainText: {
    marginLeft: 0,
    color: '#ffffff',
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SymptomInput;
