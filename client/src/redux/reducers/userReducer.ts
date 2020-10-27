import { User, UserCredentials } from "types";
import * as type from "../actions/constants";

interface SetUserAction {
    type: typeof type.SET_USER;
    payload: UserCredentials;
}

interface OtherAction {
    type:
        | typeof type.AUTH_ERROR
        | typeof type.LOGIN_FAIL
        | typeof type.SIGNUP_FAIL
        | typeof type.LOGOUT_SUCCESS
        | typeof type.LOGIN_SUCCESS;
}

type Actions = SetUserAction | OtherAction;

const userInitialState: User = {
    authenticated: false,
    credentials: null,
    likes: [],
    notifications: [],
};

export const userReducer = (
    state = userInitialState,
    action: Actions
): User => {
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
