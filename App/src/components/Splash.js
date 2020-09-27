import React from 'react';
import {
    ActivityIndicator,
    // AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        // setTimeout(() => {
            this._bootstrapAsync();
        // },0)
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('isLoggedIn');
        this.props.navigation.navigate(userToken == "true" ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={"large"}/>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center"
    }
})