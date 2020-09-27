import *as React from "react";

import MyAppBar from "../components/AppBar";
import MyDrawer from "../components/CustomDrawer";
import Table from "../components/Table"

export default class Home extends React.Component {

    constructor() {
        super();
    }

    state = {
        openDrawer:false
    };

    handleDrawer = (open) => {
        this.state.openDrawer = open;
        console.log("changed ==>", this.state.openDrawer)
    };

    render() {

        console.log("home render..")

        return(
            <div>
                <MyAppBar />
                <Table/>
            </div>
        )
    }
}