import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Entries from './Entries';
import EntryScreen from './EntryScreen';
import SelectSymptom from './SelectSymptom';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Entries" component={Entries} />
      <Stack.Screen name="EntryScreen" component={EntryScreen} />
    </Stack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="SelectSymptom" component={SelectSymptom} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
