import React, {Component} from 'react';
import { TouchableOpacity,SafeAreaView, Text,  StyleSheet } from 'react-native';


// Composant custom pour formatter les lignes de la flatlist
import ListItem from '../components/ListProducts'



class SyntheseView extends Component {
    
    
    _onPress(categorie){

        this.props.navigation.navigate('Categorie', {categorie})
    };
    
       
    render() {
    
        return (
          <SafeAreaView style={{ flex: 1, padding: 24 }}>
            
            <TouchableOpacity onPress={()=> this._onPress("a")} style={styles.categorie}>
                <Text style={styles.texte}>Nutriscore A</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._onPress("b")} style={styles.categorie}>
                <Text style={styles.texte}>Nutriscore B</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._onPress("c")} style={styles.categorie}>
                <Text style={styles.texte}>Nutriscore C</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._onPress("d")} style={styles.categorie}>
                <Text style={styles.texte}>Nutriscore D</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._onPress("e")} style={styles.categorie}>
                <Text style={styles.texte}>Nutriscore E</Text>
            </TouchableOpacity>
          </SafeAreaView>
        );
      }
};

export default SyntheseView;

const styles = StyleSheet.create({
  
    categorie : {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "#A1CDEC",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
    texte : {
        fontWeight: 'bold',
        color: 'white'
    }

});