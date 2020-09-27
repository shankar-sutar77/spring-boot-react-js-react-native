import {host} from "../constants/ApiConnstants"
import AsyncStorage from '@react-native-community/async-storage';


const request = (options) => {
    // let url = window.location.href.toString();
    // window.previousUrl = url.substring(url.indexOf("#/"));
    let headers =  getHeaders() || {};

    console.log("URL ==>", options.url)

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {

                let result = json;//JSON.parse(json.result);
                if(!response.ok) {

                    alert("response not ok...!");

                    // result = JSON.parse(json.result);
                    if (result && result["message"] === "Server Error") {
                        if(window.App) {
                            if (window.pageLoading)
                                window.pageLoading.setState({show: false});
                            window.App.setState({
                                isServerDown: false,
                                errorType: "serverError", errorAlert:true
                            });
                        }
                    }
                    if(response.status === 401 && AsyncStorage.getItem("loggedIn")) {
                        setTimeout(() => {
                            // let href = window.location.href;
                            // if (href && href.toString().indexOf("pages/login-Pages") < 0) {
                            //     _handleSessionLogout();
                            // }

                            if (window.sideBar) {
                                window.sideBar._handleLogout()
                            }

                        }, 500);
                    }else
                        return Promise.reject(json);
                } else
                    return result;
            })
        ).catch( (error) => {
            alert("error:", JSON.stringify(error))
            let errorType = "serviceUnavailable";
            if (error && error.message === "Server Error")
                errorType = "serverError";
            if (window.pageLoading)
                window.pageLoading.setState({show: false});
            if(window.App) {
                window.App.setState({
                    isServerDown:true, errorType: errorType,
                    errorAlert:true
                });
            }
        })
};

function getHeaders(isMultiPartHeader) {
    const headers = new Headers();
    if(!isMultiPartHeader) {
        headers.append('Content-Type', 'application/json');
    }

    // if(AsyncStorage.getItem(ACCESS_TOKEN)) {
    //     headers.append('Authorization', 'Bearer ' + AsyncStorage.getItem(ACCESS_TOKEN));
    //     headers.append('tenant', AsyncStorage.getItem(CURRENT_TENANT));
    //     headers.append('email', AsyncStorage.getItem(CURRENT_USER_EMAIL));
    // } else {
    //     console.log("ACCESS_TOKEN not available")
    // }

    return headers;
}

export function getRequest(requestUrl) {
    return request({
        url: `${host}/${requestUrl}`,
        method: 'GET'
    });
};

export function postRequest(requestUrl, postRequestBody = {}) {
    return request({
        url: `${host}/${requestUrl}`,
        method: 'POST',
        body: JSON.stringify(postRequestBody)
    });
};

export function directRequest(requestUrl, method = "GET", body = null) {
    let params = {
        url: requestUrl,
        method: method
    };

    if (body != null) {
        params["body"] = JSON.stringify(body);
    }
    return request(params);
}

export function  deleteRequest(requestUrl, method = "DELETE", body = null){
    let params = {
        url: requestUrl,
        method: method
    };

    if (body != null) {
        params["body"] = JSON.stringify(body);
    }

    let headers = getHeaders();

    const defaults = {headers: headers};
    params = Object.assign({}, defaults, params);

    return fetch(params.url, params);
};

export function  uploadRequest(requestUrl, body = null){
    let params = {
        url:  `${host}/${requestUrl}`,
        method: "POST",
        body: body

    };

    let headers = getHeaders(true);

    const defaults = {headers: headers};
    params = Object.assign({}, defaults, params);

    return fetch(params.url, params)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};