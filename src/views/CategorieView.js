import React, { useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, ActivityIndicator, SafeAreaView, FlatList, AsyncStorage } from 'react-native';

import ListProducts from '../components/ListProducts'


function CategorieView ({navigation, route}) {


  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(null)
  const [categorie, setCategorie] = useState(route.params.categorie);
  // const [res, setRes] = useState([]);
  

  useEffect(() => {
    focusAction();
  }, []);

  
 
  const getHistory = async () => {
    return JSON.parse(await AsyncStorage.getItem('product_history'));
  }

  const getTab = () => {
    return res;
  }

  const focusAction = async () => {
    let history_tmp = await getHistory();
    setHistory(history_tmp);
    setIsLoading(false);

  }


  if (history !== null) {
    // console.log("history existe");
    // console.log(history.length);
    var tbfilter = history.filter(function(item){
      return item["nutriscore_grade"]== categorie;
    });
    var test= tbfilter.length;
    // console.log("test tb",tbfilter);
    // console.log("test length",tbfilter.length);
  }
  else { 
    console.log("history n'existe pas");
    // alert("Vous n'avez aucun produit enregistré pour le moment.");
  }

  
  if(test >= 1) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text>
        <Text style={styles.texte}>Nutriscore</Text> <Text style={styles.nutriscore}>{categorie.toUpperCase()}</Text>
      </Text>
      <Text>{test >= 1 ? test :""} {test > 1 ? "produits" : "produit"}</Text>
  
        <ScrollView style={styles.liste}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={tbfilter}
            keyExtractor={(item, index) => 'key'+index}
            renderItem={
              ({item}) => <ListProducts item={item} navigation={navigation}  />
            }
          />
        )}
      </ScrollView>
      
    </SafeAreaView>
      );
  }
  else {
    return (
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text>
          <Text style={styles.texte}>Nutriscore</Text> <Text style={styles.nutriscore}>{categorie.toUpperCase()}</Text>
        </Text>
        <Text style={{marginTop: 50 , textAlign: "center"}}>Aucun produit dans cette catégorie</Text>
      </SafeAreaView>
      );
  }
}

export default CategorieView;

const styles = StyleSheet.create({
  button_additif: {
    color: 'blue'
  },
  nutriscore : {
    color: "#A1CDEC",
    fontSize: 30
  },
  texte : {
    fontWeight: 'bold'
  },
  liste : {
    marginTop: 20
  }
});