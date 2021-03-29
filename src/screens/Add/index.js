import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SymptomTextInput from './SymptomTextInput';
import AddMood from './AddMood';
import AddDosage from './AddDosage';
import AddLifestyle from './AddLifestyle';
import AddSymptom from './AddSymptom/AddSymptom';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Add = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AddMood" component={AddMood} />
      <Stack.Screen name="AddLifestyle" component={AddLifestyle} />
      <Stack.Screen name="AddDosage" component={AddDosage} />
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
