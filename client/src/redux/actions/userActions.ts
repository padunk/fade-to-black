import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";

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
    userData: any,
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
