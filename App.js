import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackScreen from './src/views/HomeStackScreen';
import SyntheseStackScreen from './src/views/SyntheseStackScreen';
import ScannerScreen from './src/views/ScannerScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
    <NavigationContainer >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            size = 25;

            if (route.name === 'Home') {
              iconName = 'ios-home'
            } else if (route.name === 'Synthese') {
              iconName = 'ios-list';
            } else if (route.name === 'Scanner') {
              iconName = 'ios-barcode'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#81b9de',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Scanner" component={ScannerScreen} />
        <Tab.Screen name="Synthese" component={SyntheseStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>

   
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

