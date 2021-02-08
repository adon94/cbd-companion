import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Add from '../Add';
import Stats from '../Stats';
import Entries from '../Entries';
import Onboarding from '../Onboarding';

const Tab = createBottomTabNavigator();

const LoggedIn = () => {
  const onboarded = useSelector((state) =>
    state.user ? state.user.onboarded : null,
  );

  if (!onboarded) {
    return <Onboarding />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Add"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Entries') {
            iconName = 'journal';
          } else if (route.name === 'Stats') {
            iconName = 'stats-chart';
          } else {
            iconName = 'add-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#56ab2f',
        activeBackgroundColor: '#a8e063',
        inactiveTintColor: '#fffa',
        inactiveBackgroundColor: '#a8e063',
        showLabel: false,
        style: { borderTopWidth: 0, backgroundColor: '#a8e063' },
      }}
      headerMode="screen">
      <Tab.Screen name="Entries" component={Entries} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Stats" component={Stats} />
    </Tab.Navigator>
  );
};

export default LoggedIn;
