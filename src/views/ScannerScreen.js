import React, {Component} from 'react';
import { Text, View, Vibration, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { Camera } from 'expo-camera';

import AsyncStorage from '@react-native-community/async-storage';



const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

class ScannerScreen extends Component {
    _focusListener = null;
    _blurListener = null;

    constructor(props){
        super(props);
        this.state = { 
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.torch,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null,
            hasPermission: null,
            hasScanned: null,
            isFocused: true
        }
    }

    async componentDidMount() {
        //Getting Permission result from app details.
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this.setState({ isFocused: true });
        });

        this._blurListener = this.props.navigation.addListener('blur', () => {
            this.setState({ isFocused: false });
        });

    }

    componentWillUnmount() {
        if (this._focusListener) {
            this._focusListener = null;
        }

        if (this._blurListener) {
            this._blurListener = null;
        }
    }

    changeFlash(){
        this.state.isFlashOn ? 
            this.setState({isFlashOn: false}) : 
            this.setState({isFlashOn: true})
    }

    async addProductToHistory(product) {
        try {
            let history = JSON.parse(await AsyncStorage.getItem('product_history'));
            console.log(history);
            if(history == null){
                history = [];
            }
            history.push(product);
            console.log(history.length);
            console.log(history);
            await AsyncStorage.setItem('product_history', JSON.stringify(history));

        }
        catch (e){
            console.log(error(e));
        }
    }


    handleBarCodeScanned = ({ type, data }) => {

        this.setState({scanned: true})
        Vibration.vibrate();
        

        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`) 
            .then((response) => response.json())
            .then((responseJson) => {

                this.addProductToHistory(responseJson.product);

                // Variante de navigate si je veux aller dans une autre pile de navigation
                // https://reactnavigation.org/docs/params#passing-params-to-nested-navigators
                this.props.navigation.navigate('Home', {
                    screen: 'Produit',
                    params: { product: responseJson.product },
                });



            })
            .catch((error) =>{
                console.error(error);
            });

        
    };
    
    
    render(){
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } 
        else if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera</Text>
                </View>
            );
        } 
        else if (this.state.isFocused)
        {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        type={this.state.type}
                        flashMode={this.state.isFlashOn ?  Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }} 
                        >
                        <Button  title={'Flash'} onPress={()=> this.changeFlash() } />
                        <Button  title={'Recommencer'} onPress={()=> this.setState({scanned: null})} />
                        
                    </Camera>
                </View>
            );
        }

        return null;
    }
}

export default ScannerScreen;

