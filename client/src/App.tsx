import React from "react";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import { _store } from "./redux/store";
import Router from "./Router/Router";
import * as type from "./redux/actions/constants";
import { JwtToken } from "types";
import { axios } from "./Axios";
import { getUserData, logOut } from "./redux/actions/userActions";

function App() {
    const idToken = window.localStorage.getItem(type.LOCAL_STORAGE_KEY);

    React.useEffect(() => {
        if (typeof idToken === "string" && idToken !== "") {
            const decodedToken = jwtDecode(idToken) as JwtToken;

            if (decodedToken.exp * 1000 < Date.now()) {
                _store.dispatch({ type: type.SET_UNAUTH });
                // @ts-ignore
                _store.dispatch(logOut());
                window.location.href = "/";
            } else {
                _store.dispatch({ type: type.SET_AUTH });
                axios.defaults.headers.common["Authorization"] = idToken;
                // @ts-ignore
                _store.dispatch(getUserData());
            }
        }
    }, [idToken]);

    return (
        <Provider store={_store}>
            <div className="bg-gray-900 text-white min-h-screen">
                <Router />
            </div>
        </Provider>
    );
}

export default App;
