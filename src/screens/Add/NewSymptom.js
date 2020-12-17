import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Spinner } from 'native-base';

import { addSymptom } from '../../api/database';

import Layout from '../../components/Layout';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const NewSymptom = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await addSymptom(name.value);
    setLoading(false);
    navigation.goBack();
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <View style={styles.container}>
        <Text style={styles.heading}>Track a new symptom</Text>
        <View>
          <TextInput
            placeholder="Symptom name"
            returnKeyType="done"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
            autoCapitalize="none"
            autoCompleteType="name"
          />
        </View>
        <View>
          <Button onPress={submit}>Add</Button>
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
    marginTop: 85,
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    marginRight: 20,
  },
  softButton: {
    backgroundColor: '#f0f0f04D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
});

export default NewSymptom;
