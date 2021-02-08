import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, useSelector, useDispatch } from 'react-redux';

import theme from './src/core/theme';
import { isOnboarded } from './src/api/database';
import store from './src/reducers';

import Login from './src/screens/NoUser/Login';
import Register from './src/screens/NoUser/Register';
import PreLogin from './src/screens/NoUser/PreLogin';
import LoggedIn from './src/screens/LoggedIn/LoggedIn';

import { set as setUser, setOnboarded } from './src/reducers/userReducer';
import LoadingScreen from './src/screens/LoadingScreen';

const Stack = createStackNavigator();

const Providers = ({ children }) => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </PaperProvider>
  </Provider>
);

const App = () => {
  const user = useSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  async function onAuthStateChanged(newUser) {
    dispatch(setUser({ email: newUser.email }));
    if (initializing) {
      setInitializing(false);
    }
    const userInfo = await isOnboarded();
    if (userInfo && userInfo.onboarded) {
      dispatch(setOnboarded(true));
    }
    setLoaded(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || !loaded) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="PreLogin" component={PreLogin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }

  return <LoggedIn />;
};

const AppWithProviders = () => (
  <Providers>
    <App />
  </Providers>
);

export default AppWithProviders;
