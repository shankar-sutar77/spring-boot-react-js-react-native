import * as React from 'react';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, Dimensions} from "react-native"
import {Button, Paragraph, Menu, Divider, Provider} from 'react-native-paper';
import { Toolbar } from 'react-native-material-ui';



export default class MyComponent extends React.Component {


    state = {
        visible: false
    };

    _goBack = () => console.log('Went back');

    _handleSearch = () => console.log('Searching');

    _handleMore = () => {
        this._openMenu();
    };

    _openMenu = () => this.setState({visible: true});

    _closeMenu = () => {
        console.log("menu clicked.")
        this.setState({visible: false});
    }

    _handleLogOut = async () => {
        AsyncStorage.setItem("isLoggedIn", "false");
    };

    _handleMoreVertSelection = (selection) => {

        console.log("selection ==>", selection);

        let index = selection.index
        let itemSelected = selection.result || null;
        if (index != null && itemSelected != null) {
            if (index === 0) {
                this.props.nav.navigate("Settings")
            } else if(index === 1) {
                this.props.nav.navigate("Settings")
            }
        }
    }

    render() {

        const screenWidth = Math.round(Dimensions.get('window').width);

        const MenuIcon = (
            <Icon
                style={{paddingLeft: 10}}
                onPress={() => this.props.nav.openDrawer()}
                name="menu"
                size={30}
            />
        );

        const MY_MENU = (
            <Provider>
                <View>
                    <Menu
                        style={styles.menuStyle}
                        visible={this.state.visible}
                        onDismiss={this._closeMenu}
                        anchor={
                            {x: screenWidth, y: 100}
                        }
                    >
                        <Menu.Item onPress={() => {
                            this._closeMenu()
                        }} title="setings"/>
                        <Menu.Item onPress={() => {
                            this._closeMenu()
                        }} title="Item 2"/>
                        {/*<Divider />*/}
                        <Menu.Item onPress={() => {
                            this._closeMenu()
                        }} title="Item 3"/>
                    </Menu>
                </View>
            </Provider>
        );

        const TOOL_BAR = (
            <Toolbar
                leftElement="menu"
                centerElement={this.props.title}
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                }}
                rightElement={{
                    menu: {
                        icon: "more-vert",
                        labels: ["settings"]
                    }
                }}
                onRightElementPress={ (selection) => { this._handleMoreVertSelection(selection) }}
                onLeftElementPress={ () => { this.props.nav.openDrawer() }}

            />
        );


        return (
            <View>
                {TOOL_BAR}
                {/*<Appbar.Header>
                    {MenuIcon}
                    <Appbar.Content
                        title="Title"
                        subtitle="Subtitle"
                    />
                    <Appbar.Action icon="magnify" onPress={this._handleSearch}/>
                    <Appbar.Action icon="dots-vertical" onPress={this._handleMore}/>
                    {MY_MENU}
                </Appbar.Header>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuStyle: {
        position: 'absolute'
    }
})