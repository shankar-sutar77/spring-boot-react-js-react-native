import {postRequest} from "./RestApiUtils";

class CustomLogger {

    constructor() {

    }

    sendLog = (log) => {
        postRequest("createLog", log)
            .then((res) => {
                console.log("log ==>", res);
            })
    };

    info = (info, object = null) => {
        let params = {
            type: "info",
            description: info,
            logDetails: object
        };
        this.sendLog(params);
    };

    warning = (info, object = null) => {
        let params = {
            type: "warning",
            description: info,
            logDetails: object
        };
        this.sendLog(params);
    };

    error = (info, object = null) => {
        let params = {
            type: "error",
            description: info,
            logDetails: object
        };
        this.sendLog(params);
    };
}

export default new CustomLogger();