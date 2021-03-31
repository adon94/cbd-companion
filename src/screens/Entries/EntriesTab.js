import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EntriesList from './EntriesList/EntriesList';
import SingleEntry from './SingleEntry/SingleEntry';
import SelectSymptom from './SelectSymptom/SelectSymptom';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Entries" component={EntriesList} />
      <Stack.Screen name="EntryScreen" component={SingleEntry} />
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
