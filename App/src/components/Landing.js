import * as React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./authScreens/LoginScreen";
import RegisterScreen from "./authScreens/RegisterScreen";
import Splash from "./Splash";
import HomeStack from "./homeScreens/HomeLanding"
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Settings from "./settingsScreens/Settings";
import PrivacyScreen from "./settingsScreens/PrivacyScreen";

const AppStack = createStackNavigator(
    {
        Home: {
                screen: HomeStack,
                navigationOptions: {
                    headerShown:false
                }
            },
        Settings: { screen: Settings},
        Privacy: {screen: PrivacyScreen}
    });

const AuthStack = createStackNavigator({
    signin: LoginScreen,
    register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: Splash,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);

