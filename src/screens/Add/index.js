import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewSymptom from './NewSymptom';
import AddMood from './AddMood';
import AddDosage from './AddDosage';
import SelectAdd from './SelectAdd';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Add = () => {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="SelectAdd" component={SelectAdd} /> */}
      <Stack.Screen name="AddMood" component={AddMood} />
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
      <RootStack.Screen name="NewSymptom" component={NewSymptom} />
      <RootStack.Screen name="AddDosage" component={AddDosage} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
