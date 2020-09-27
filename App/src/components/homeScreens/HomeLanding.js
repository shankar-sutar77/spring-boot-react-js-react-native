import *as React from "react";
import {View, Text, StyleSheet} from "react-native";
import { createDrawerNavigator } from 'react-navigation-drawer';
import Notification from "../Notification";
import Table from "./Table"
import HomeScreen from "./HomeScreen";
import CustomDrawer from "../drawerScreens/CustomDrawer";

const HomeStack = createDrawerNavigator(
    {
        Home: HomeScreen,
        Notification: Notification,
        // Alert: Table
    },
    {
        contentComponent: CustomDrawer
    }
);

export default HomeStack;