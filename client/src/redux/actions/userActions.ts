import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";
import { Login, SignUp } from "types";
import * as H from "history";

const getUserData = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        const response = await axios.get("/user");

        dispatch({
            type: type.SET_USER,
            payload: (await response).data,
        });
    } catch (error) {
        console.log("getUserDataError :>> ", error);
    }
};

export const logIn = (
    userData: Login,
    history: H.History,
    redirectPage: string
) => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: type.LOADING,
    });
    try {
        const response = await axios.post("/login", JSON.stringify(userData));
        const token = await response.data.token;
        if (token !== "") {
            dispatch({
                type: type.LOGIN_SUCCESS,
            });
            const storiesToken = `Bearer ${token}`;
            localStorage.setItem(type.LOCAL_STORAGE_KEY, storiesToken);
            axios.defaults.headers.common["Authorization"] = storiesToken;
            getUserData()(dispatch);
            history.push(redirectPage);
        }
    } catch (err) {
        dispatch({
            type: type.LOGIN_FAIL,
            payload: err.response.data.error,
        });
    }
};

export const logOut = (history: H.History) => async (
    dispatch: Dispatch
): Promise<void> => {
    localStorage.removeItem(type.LOCAL_STORAGE_KEY);
    try {
        await axios.post("/logout");
        dispatch({ type: type.LOGOUT_SUCCESS });
    } catch (error) {
        console.error(error);
    } finally {
        delete axios.defaults.headers.common;
        history.push("/");
    }
};

export const signUp = (
    userData: SignUp,
    updateForm: (s: string) => void
) => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: type.LOADING,
    });

    try {
        const response = await axios.post("/signup", userData);
        const token = await response.data.userToken;
        if (token !== "") {
            dispatch({
                type: type.SIGNUP_SUCCESS,
            });
            updateForm("login");
        }
    } catch (err) {
        dispatch({
            type: type.SIGNUP_FAIL,
            payload: err.response.data.error,
        });
    }
};

export const forgotPassword = (
    userEmail: string,
    updateForm: (s: string) => void
) => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: type.LOADING,
    });

    axios
        .post("/forgot-password", { email: userEmail })
        .then(() => {
            dispatch({
                type: type.SENT_RESET_PASSWORD,
            });
            updateForm("login");
        })
        .catch((error) => {
            console.log("error", error);
            dispatch({
                type: type.AUTH_ERROR,
                payload: error.response.data.error,
            });
        });
};
