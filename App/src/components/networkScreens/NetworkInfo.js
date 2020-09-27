import NetInfo from '@react-native-community/netinfo'

export function checkNetworkStatus(callBack, unsubscribeListener) {
    NetInfo.fetch().then(state => {
        if (typeof callBack === "function")
            callBack(state);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
        if (typeof callBack === "function")
            callBack(state);
    });
    if (unsubscribeListener)
        unsubscribe();
}