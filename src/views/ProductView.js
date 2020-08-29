import React,  { useCallback , useState, useEffect} from 'react';
import { StyleSheet, Button ,Linking, ScrollView, SafeAreaView, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';



function ProductView ({route}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const nutriscore_data = route.params.product.nutriscore_data;
  const additives = (route.params.product.additives_tags ? route.params.product.additives_tags : null);
  const URL_additif = "https://world.openfoodfacts.org/additive/";
  
  const OpenURLButton = ({ url, children, text }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  return <Text style={styles.button_additif} title={children} onPress={handlePress} > - {text}</Text>;
  };
  
  
  let tab_additiv = [];
  
  if( additives != null) {
    for (const [key, value] of Object.entries(additives)) {
      tab_additiv.push(
        <OpenURLButton key={key} url={URL_additif+value.substring(3)} text={value.substring(3)}/>
      )
    }
  }

  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      
  }

  


  

  // console.log(additives.length); 
  // console.log(route.params.product);

 
 
  return (


    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20, backgroundColor: 'white' }}>
        <ScrollView>
    
          <Image 
              source={{uri: route.params.product.image_small_url }}
              style={{ alignSelf: 'center', width: 200, height: 200 }}
          />

          <Text>
            <Text style={styles.nom}>Nom du produit :</Text> <Text>{route.params.product.product_name_fr}</Text>
          </Text>

          <Text>
            <Text style={styles.nom}>Magasins :</Text> <Text>{route.params.product.stores}</Text>
          </Text>

          <Text>
            <Text style={styles.nom}>Marque :</Text> <Text>{route.params.product.brands}</Text> 
          </Text>
          
          <Text>
            <Text style={styles.nom}>Quantité :</Text> <Text>{route.params.product.quantity}</Text>
          </Text>

          <Text>
            <Text style={styles.nom}>Nvar :</Text> <Text>{route.params.product.nova_group}</Text>
          </Text>
          
          <Text>
            <Text style={styles.nom}>Score :</Text> <Text>{route.params.product.nutriscore_grade}</Text>
          </Text>
          
          <Text>
            <Text style={styles.nom}>Packaging :</Text> <Text>{route.params.product.packaging}</Text>
          </Text>
          
                
          
          <Text style={styles.nom}>Texte ingrédients :</Text> 
          <Text>{route.params.product.ingredients_text_fr}</Text>
 

          <Text style={styles.nom}>
              Apport nuttritionnel pour 100g :
          </Text>

           <Text>
            - Sucre : {route.params.product.nutriments.sugars_100g} {route.params.product.nutriments.sugars_unit}
          </Text>

          <Text> 
            - Calories : {route.params.product.nutriments["energy-kcal_100g"]} {route.params.product.nutriments["energy_unit"]}
          </Text>

          <Text>
            - Graisses saturées : {route.params.product.nutriments["saturated-fat_100g"]} {route.params.product.nutriments["saturated-fat_unit"]}
          </Text>

          <Text>
            - Sel : {route.params.product.nutriments.salt_100g} {route.params.product.nutriments.salt_unit}
          </Text>

          <Text>
            - Protéines : {route.params.product.nutriments.proteins_100g} {route.params.product.nutriments.proteins_unit}
          </Text>

          <Text>
            - Fibres : {route.params.product.nutriscore_data.fibers} g
          </Text>

          { additives != null &&
            additives.length > 0 &&
            <Text>Addictifs :</Text>
          }
          {tab_additiv}


          {/* Nuttriments
          
          - Sucre / sugars_100g (g)
          - Calories / energy-kcal_value (g)
          - Graisses saturées / satureated-fat (g)
          - Sel / salt_value (g)
          - Protéines / proteins (g)
          - Additifs / 
          - Fibres / fiber (g)
          - Légumes / fruits-vegetables-nuts_100g (g)
          */}



      </ScrollView>   

    </SafeAreaView>
    
  );
};

export default ProductView;


const styles = StyleSheet.create({
  button_additif: {
    color: 'blue'
  },
  nom : {
    fontWeight: 'bold'
  }
});