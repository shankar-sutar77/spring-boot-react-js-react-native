import *as React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {postRequest} from "../../utils/RestApiUtils";

export default class RegisterScreen extends React.Component {

    static navigationOptions = {
        headerTitle: "Register"
    }

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            email:"",
            password:""
        };
    };

    _validateField = () => {
        let state = this.state;
        let username = state.username || "";
        let email = state.email || "";
        let password = state.password || "";
        let message = "Please enter ";
        let status = true;
        if (!username || username === "") {
            message += " username"
            state = false;
        }
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

    onRegster = () => {

        if (this._validateField()) {
            let state = this.state;
            let params = {
                username: state.username,
                email: state.email,
                password: state.password
            };

            postRequest("createOrUpdateUser", params)
                .then( (respone) => {
                    if (respone.result) {
                        alert("user register successful..!");
                        this.props.navigation.navigate("signin");
                    } else if(!respone.result) {
                        alert("user already exists..!")
                    } else {
                        alert("error...!")
                    }
                })
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="UserName"
                           // secureTextEntry={true}
                           placeholderTextColor="#113356"
                           onChangeText={(username) => this.setState({username})}

                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Email"
                           placeholderTextColor="#113356"
                           selectionColor="#fff"
                           keyboardType="email-address"
                           onSubmitEditing={() => this.password.focus()}
                           onChangeText={(email) => this.setState({email})}
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Password"
                           secureTextEntry={true}
                           placeholderTextColor="#113356"
                           onChangeText={(password) => this.setState({password})}

                />
                <TouchableOpacity
                    onPress={() => {
                        this.onRegster()
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>{"Register"}</Text>
                </TouchableOpacity>
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