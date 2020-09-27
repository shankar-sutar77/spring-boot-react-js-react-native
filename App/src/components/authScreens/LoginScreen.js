import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {host} from "../../constants/ApiConnstants";
import {getRequest, postRequest} from "../../utils/RestApiUtils";


export default class LoginScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerShown: false
        }
    };

    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    };

    onLogin = () => {
        this._authenticateUser()
    };

    _validateField = () => {
        let state = this.state;
        let email = state.email || "";
        let password = state.password || "";
        let message = "Please enter ";
        let status = true;
        if (!email || email === "") {
            message += " email"
            state = false;
        }

        if (!password || password === "") {
            state = false;
            email.trim().length > 0 ? message += "password" : message += " ,password";
        }

        if (!state)
            alert(message + ".");

        return state;
    };

    _authenticateUser = () => {

        if (this._validateField()) {

            let params = {
                email: this.state.email || "",
                password: this.state.password || ""
            };

            postRequest("validateUser", params)
                .then( (responce) => {
                    console.log("validation responce ==>", responce);
                    if (responce.authenticated) {
                        this._handleAsych();
                        this.props.navigation.navigate('App');
                    } else {
                        alert("user doesn't exits");
                    }
                })
        }
    }

    _handleAsych = async () => {
        AsyncStorage.setItem('isLoggedIn', "true");
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Email"
                           value={this.state.email}
                           placeholderTextColor = "#113356"
                           selectionColor="#fff"
                           keyboardType="email-address"
                           onSubmitEditing={()=> this.password.focus()}
                           onChangeText={ (email) => this.setState({email})}
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Password"
                           value={this.state.password}
                           secureTextEntry={true}
                           placeholderTextColor = "#113356"
                           onChangeText={ (password) => this.setState({password})}

                />
                <TouchableOpacity
                    onPress={ () => {this.onLogin()}}
                    style={styles.button}>
                    <Text style={styles.buttonText}>{"Login"}</Text>
                </TouchableOpacity>
                <Text
                onPress={() => {this.props.navigation.navigate('register');}}
                >dont have account? register</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },

    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth:2,
        paddingHorizontal:16,
        fontSize:16,
        color:'#000000',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }

});