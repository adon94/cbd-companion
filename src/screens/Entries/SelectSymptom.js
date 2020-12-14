import React from 'react';
import { Form, Icon, Picker } from 'native-base';

const SelectSymptom = ({ selected, setSelected, options }) => {
  return (
    <Form>
      <Picker
        mode="dropdown"
        iosHeader="Symptoms"
        iosIcon={<Icon name="arrow-down" style={{ color: '#ffffff' }} />}
        textStyle={{ color: '#ffffff' }}
        selectedValue={selected.toString() || '0'}
        onValueChange={(value) => setSelected(parseInt(value))}>
        {options.map(({ name }, index) => (
          <Picker.Item
            style={{ color: '#ffffff' }}
            label={name}
            value={index.toString()}
            key={name}
          />
        ))}
      </Picker>
    </Form>
  );
};

export default SelectSymptom;
