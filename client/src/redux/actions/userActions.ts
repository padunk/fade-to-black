import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";
import { Login, SignUp } from "types";

const getUserData = () => async (dispatch: Dispatch) => {
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
    history: History,
    redirectPage: string
) => async (dispatch: Dispatch) => {
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
            // @ts-ignore
            history.push(redirectPage);
        }
    } catch (err) {
        dispatch({
            type: type.LOGIN_FAIL,
            payload: err.response.data.error,
        });
    }
};

export const logOut = (history: any) => async (dispatch: Dispatch) => {
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
    setFormType: React.Dispatch<React.SetStateAction<string>>
) => async (dispatch: Dispatch) => {
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
            setFormType("login");
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
    setFormType: React.Dispatch<React.SetStateAction<string>>
) => async (dispatch: Dispatch) => {
    dispatch({
        type: type.LOADING,
    });

    axios
        .post("/forgot-password", userEmail)
        .then(() => {
            dispatch({
                type: type.SENT_RESET_PASSWORD,
            });
            setFormType("login");
        })
        .catch((error) => {
            console.log("error", error);
            dispatch({
                type: type.AUTH_ERROR,
                payload: error.response.data.error,
            });
        });
};
