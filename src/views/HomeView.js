import React, { useState, useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, FlatList, AsyncStorage } from 'react-native';
// import { ListItem } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';



import ListProducts from '../components/ListProducts'


function HomeView ({navigation}) {

  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(null)


  useEffect(() => {
    focusAction();
  },[]);

  useFocusEffect(
    React.useCallback(() => {
      const focusSubscription = navigation.addListener('focus', focusAction)
      return () => focusSubscription();
    })
    
  );
  
  
  const getHistory = async () => {
    return JSON.parse(await AsyncStorage.getItem('product_history'));
  }

  const focusAction = async () => {
    // await AsyncStorage.clear() 
    let history = await getHistory();
    setHistory(history);
    setIsLoading(false);
  }


  // console.log("history",history);

  return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={history}
              keyExtractor={(item, index) => 'key'+index}
              renderItem={
                ({item}) => <ListProducts item={item} navigation={navigation}  />
              }
            />
          )}
        </SafeAreaView>
  );
} 

export default HomeView;