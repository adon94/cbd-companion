import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SymptomTextInput from './CustomInput/CustomInput';
import AddDay from './AddMood/AddDay';
import AddDose from './AddDose/AddDose';
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
      <Stack.Screen name="AddMood" component={AddDay} />
      <Stack.Screen name="AddLifestyle" component={AddLifestyle} />
      <Stack.Screen name="AddDose" component={AddDose} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen
        name="AddTab"
        component={Add}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="SymptomTextInput" component={SymptomTextInput} />
      <RootStack.Screen name="AddSymptom" component={AddSymptom} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
