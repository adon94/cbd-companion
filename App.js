import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider } from 'react-native-paper';

import { StateProvider } from './src/core/store';
import theme from './src/core/theme';

import Login from './src/screens/NoUser/Login';
import Register from './src/screens/NoUser/Register';
import PreLogin from './src/screens/NoUser/PreLogin';
import Add from './src/screens/Add';
import Stats from './src/screens/Stats';
import Entries from './src/screens/Entries';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Providers = ({ children }) => (
  <StateProvider>
    <PaperProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </PaperProvider>
  </StateProvider>
);

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <Providers>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="PreLogin" component={PreLogin} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </Providers>
    );
  }

  return (
    <Providers>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Entries') {
              iconName = 'pencil';
            } else if (route.name === 'Stats') {
              iconName = 'newspaper';
            } else {
              iconName = 'add-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#56ab2f',
          activeBackgroundColor: '#ffffff',
          inactiveTintColor: '#C0C1C6',
          inactiveBackgroundColor: '#ffffff',
          showLabel: false,
        }}
        headerMode="none">
        <Tab.Screen name="Entries" component={Entries} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    </Providers>
  );
};

export default App;
