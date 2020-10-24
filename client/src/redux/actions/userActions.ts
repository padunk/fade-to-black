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

export const logIn = (userData: any) => async (dispatch: Dispatch) => {
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
            localStorage.setItem("storiesToken", storiesToken);
            axios.defaults.headers.common["Authorization"] = storiesToken;
            getUserData()(dispatch);
        }
    } catch (err) {
        dispatch({
            type: type.LOGIN_FAIL,
            payload: err.response.data.error,
        });
    }
};
