import { User } from "types";
import * as type from "../actions/constants";

const userInitialState: User = {
    authenticated: false,
    credentials: null,
    likes: [],
    notifications: [],
};

export const userReducer = (state = userInitialState, action: any) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
            };
        case type.AUTH_ERROR:
        case type.LOGIN_FAIL:
        case type.SIGNUP_FAIL:
            return {
                ...state,
                authenticated: false,
            };
        case type.LOGOUT_SUCCESS:
            return {
                authenticated: false,
                credentials: null,
                likes: [],
                notifications: [],
            };
        case type.SET_USER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
