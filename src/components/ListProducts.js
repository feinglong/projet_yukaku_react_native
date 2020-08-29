import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import image_defaut from '../../assets/image_defaut.png'

class ListProducts extends Component{

   
    _onPress(item){

        this.props.navigation.navigate('Produit', 
            {
                product: item
            }
        )
    };


    render() {

        

        return (
            <View style={styles.lineContainer}>
                <TouchableOpacity onPress={()=> this._onPress(this.props.item)} style={{flexDirection: 'row', height: 90}}>
                   <View>
                       
                        <Image 
                            source={{uri: this.props.item.image_front_thumb_url }}
                            style={{ width: 50 , height: 50 }}
                            resizeMode = {'contain'}
                        />
                       
                   </View>
                    <View style={styles.content}>
                        <Text style={styles.nom}>{this.props.item.product_name_fr}</Text>
                        <Text>
                            <Text style={styles.nom}>Marque :</Text>
                            <Text >{this.props.item.brands}</Text>
                        </Text>
                        <Text>
                            <Text style={styles.nom}>Score : </Text>
                            <Text >{this.props.item.nutriscore_grade ? this.props.item.nutriscore_grade : ""}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineContainer: {
      height: 'auto',
      padding: 10,
      backgroundColor: 'white',
      marginBottom: 20
    },
    content : {
        marginLeft : 10,
        width: 300
    },
    nom : {
        fontWeight: 'bold'
    }
});

export default ListProducts;



