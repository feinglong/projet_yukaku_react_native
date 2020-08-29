import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SyntheseView from './SyntheseView';
import CategorieView from './CategorieView';

const SyntheseStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SyntheseStack.Navigator>
      <SyntheseStack.Screen name="Synthèse" component={SyntheseView} /> 
      <SyntheseStack.Screen name="Categorie" component={CategorieView} /> 
    </SyntheseStack.Navigator>
  );
}