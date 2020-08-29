import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './HomeView';
import ProductView from './ProductView';


const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeView} />
      <HomeStack.Screen name="Produit" component={ProductView} />
    </HomeStack.Navigator>
  );
}
