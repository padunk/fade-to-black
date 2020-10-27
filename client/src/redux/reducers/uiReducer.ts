import * as type from "../actions/constants";
import { AuthError } from "types";

interface FailAction {
    type:
        | typeof type.AUTH_ERROR
        | typeof type.LOGIN_FAIL
        | typeof type.SIGNUP_FAIL;
    payload: AuthError;
}

interface OtherAction {
    type:
        | typeof type.LOGIN_SUCCESS
        | typeof type.SIGNUP_SUCCESS
        | typeof type.SENT_RESET_PASSWORD
        | typeof type.LOADING
        | typeof type.LOGOUT_SUCCESS
        | typeof type.CLEAR_ERROR;
}

type Actions = FailAction | OtherAction;

const uiInitialState: AuthError = {
    errorMessage: "",
    loading: false,
};

export const uiReducer = (state = uiInitialState, action: Actions) => {
    switch (action.type) {
        case type.AUTH_ERROR:
        case type.LOGIN_FAIL:
        case type.SIGNUP_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false,
            };
        case type.LOGIN_SUCCESS:
        case type.SIGNUP_SUCCESS:
        case type.SENT_RESET_PASSWORD:
            return {
                ...state,
                loading: false,
            };
        case type.LOADING:
            return {
                ...state,
                loading: true,
            };
        case type.LOGOUT_SUCCESS:
            return {
                errorMessage: "",
                loading: false,
            };
        case type.CLEAR_ERROR:
            return {
                ...state,
                errorMessage: "",
            };
        default:
            return state;
    }
};
