import * as type from "../actions/constants";

const uiInitialState = {
    errorMessage: "",
    loading: false,
};

export const uiReducer = (state = uiInitialState, action: any) => {
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
        default:
            return state;
    }
};
