import * as  React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Button} from "react-native-paper";

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.conatiner}>
                <Text>Privacy</Text>
                <Button
                    icon="image"
                    mode="contained"
                    onPress={() => console.log('Pressed')}>
                    Press me
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
