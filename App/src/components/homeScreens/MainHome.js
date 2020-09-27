import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import HomeScreen from "../HomeScreen";
import MyAppBar from "../AppBar"

export default class MainHome extends React.Component {

    constructor(props) {
        super(props);

    };

    render() {
        return(
                <MyAppBar/>
        )
    }


}