import *as React from "react";
import {View, Text, StyleSheet, Dimensions,ProgressBarAndroid} from "react-native";
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import {checkNetworkStatus} from "../networkScreens/NetworkInfo";
import CustomLogger from "../../utils/CustomLogger";
// import {logDnaLogger} from "../Logging/LogDna";


export default class NetworkInfoDisplay extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        networkInfo: "",
        isConnected: true,
        showGreen: false
    };

    componentDidMount() {

        // setTimeout(() => {
        //     this.setState({isConnected:false, networkInfo:"not conncted..!"})
        // },5000);
        //
        // setTimeout(() => {
        //     this.setState({networkInfo:" conncted..!", showGreen:true})
        // },10000);
        //
        // setTimeout(() => {
        //     this.setState({isConnected:true})
        // },12000);

        let timer = null;
        checkNetworkStatus((state) => {
            console.log("netInfo ==>", state);
            CustomLogger.info("netInfo" , state);
                if (state.isConnected) {
                this.setState({networkInfo: "we are back ...!", showGreen: true});
                if (!timer) {
                    timer = setTimeout(() => {
                        this.setState({isConnected: true});
                        timer = null;
                    }, 3000)
                }
            } else {
                this.setState({
                    isConnected: false, showGreen:false,
                    networkInfo: "could not connect to internet."})
            }
        });
    }

    componentWillUnmount() {
        // checkNetworkStatus(null, "unsubscribe");
    }

    render() {

        const state = this.state;

        const NET_INFO = (
            <View style={
                state.showGreen ? {backgroundColor: 'green', padding:10} : {backgroundColor: 'red', padding:10}
            }>
                <Text style={state.isConnected ? {color:'white'}: {color: 'black'}}>{this.state.networkInfo}</Text>
            </View>
        );
        
        return (
            <View>
                { !state.isConnected && NET_INFO}
            </View>
        );
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
    },
    networkInfo: {
        // height:10,
        backgroundColor: '#123456',
        padding:10,
    }
})
