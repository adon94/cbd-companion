import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from './Onboarding';
import NewSymptom from '../Add/NewSymptom';
// import EntryScreen from './EntryScreen';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Entries" component={Onboarding} />
      {/* <Stack.Screen name="EntryScreen" component={EntryScreen} /> */}
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
      <RootStack.Screen name="NewSymptom" component={NewSymptom} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
