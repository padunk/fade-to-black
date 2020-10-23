import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { uiReducer } from "./reducers/uiReducer";
import { userReducer } from "./reducers/userReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    // data: dataReducer,
    ui: uiReducer,
    user: userReducer,
});

const composeEnhancers =
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
);

export const _store = createStore(reducers, initialState, enhancer);
