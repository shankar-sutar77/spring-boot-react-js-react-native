import *as React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import MyAppBar from "./AppBar";
import MyTable from "./Table";
import { ActionButton } from 'react-native-material-ui';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import NetworkInfoDisaply from "../networkScreens/NetworkInfoDisaply";



export default class HomeScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:"Home",
        }
    };

    constructor(props) {
        super(props);
    }

    render() {

        const screenHeigth = Math.round(Dimensions.get('window').height);
        const screenWidth = Math.round(Dimensions.get('window').width);

        const MY_ICON = (
            <Icon name="camera" size={20}/>
        );

        return(
                <View>
                    <MyAppBar nav={this.props.navigation} title={"Home"} />
                    <NetworkInfoDisaply/>
                    <MyTable />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },
    actionButton:{
        position:"relative",
        bottom:0,
        right:0
    }
})
