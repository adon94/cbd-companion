import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SymptomTextInput from './CustomInput/CustomInput';
import AddMood from './AddMood/AddMood';
import AddDosage from './AddDosage/AddDosage';
import AddLifestyle from './AddLifestyle/AddLifestyle';
import AddSymptom from './AddSymptom/AddSymptom';
import SelectOption from './SelectOption';
import AddProduct from './Product/AddProduct';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Add = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SelectOption" component={SelectOption} />
      <Stack.Screen name="AddMood" component={AddMood} />
      <Stack.Screen name="AddLifestyle" component={AddLifestyle} />
      <Stack.Screen name="AddDosage" component={AddDosage} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen
        name="Main"
        component={Add}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="SymptomTextInput" component={SymptomTextInput} />
      <RootStack.Screen name="AddSymptom" component={AddSymptom} />
      {/* <RootStack.Screen name="AddDosage" component={AddDosage} /> */}
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
