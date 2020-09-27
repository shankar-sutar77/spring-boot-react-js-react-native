import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import { Badge, Avatar } from 'react-native-material-ui';


export default class CustomDrawer extends Component {
    constructor() {
        super();
        this.proileImage = 'https://pngimage.net/wp-content/uploads/2018/06/user-profile-icon-png-4.png';
        this.items = [
            {
                navOptionThumb: 'camera',
                navOptionName: 'Home',
                screenToNavigate: 'Home',
            },
            {
                navOptionThumb: 'image',
                navOptionName: 'Notification',
                screenToNavigate: 'Notification',
            },
            {
                navOptionThumb: 'logout',
                navOptionName: 'Logout',
                screenToNavigate: 'signin',
            },
        ];
        this.state = {
            currentScreenIndex: null
        }
    };

    _handleLogOut = async () => {
        console.log("logout user async..!");
        AsyncStorage.setItem("isLoggedIn", "false");
    };


    render() {
        
        let state = this.state;
        return (
            <View style={styles.sideMenuContainer}>
                {/*Top Large Image */}
                <Image
                    source={{ uri: this.proileImage }}
                    style={styles.sideMenuProfileIcon}
                />
                {/*Divider between Top Image and Sidebar Option*/}
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#5a88e2',
                        marginTop: 15,
                    }}
                />
                {/*Setting up Navigation Options from option array using loop*/}
                <View style={{ width: '100%' }}>
                    {this.items.map((item, key) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: this.state.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                            }}
                            key={key}>

                            <View style={{ marginRight: 10, marginLeft: 20 }}>
                                <Icon name={item.navOptionThumb} size={25} color="#808080" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: this.state.currentScreenIndex === key ? 'red' : 'black',
                                }}
                                onPress={() => {
                                    this.state.currentScreenIndex = key;
                                    this.props.navigation.navigate(item.screenToNavigate);
                                    if (item.navOptionName === "Logout") {
                                        this._handleLogOut();
                                    }
                                }}>
                                {item.navOptionName}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 150 / 2,
    },
});