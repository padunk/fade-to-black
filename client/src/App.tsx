import React from "react";
import { Provider } from "react-redux";
import { _store } from "./redux/store";
import Router from "./Router/Router";

function App() {
    return (
        <Provider store={_store}>
            <div className="bg-gray-900 text-white min-h-screen">
                <Router />
            </div>
        </Provider>
    );
}

export default App;
