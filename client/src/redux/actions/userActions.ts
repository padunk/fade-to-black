import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";

interface LoginResponse {
    token: string;
    error: string;
}

const requestPost = async (url: string, data: any): Promise<LoginResponse> => {
    const result: LoginResponse = { token: "", error: "" };
    try {
        const response = await axios.post(url, data);
        console.log("response", response);
        const token = await response.data.token;
        result.token = token;
    } catch (error) {
        console.log("loginError :>> ", error.response.data);
        result.error = error.response.data.message;
    } finally {
        return result;
    }
};

export const logIn = (userData: any) => async (dispatch: Dispatch) => {
    dispatch({
        type: type.LOADING,
    });
    try {
        const { token, error } = await requestPost(
            "/login",
            JSON.stringify(userData)
        );
        if (token) {
            console.log("token :>> ", token);
            dispatch({
                type: type.LOGIN_SUCCESS,
            });
            const storiesToken = `Bearer ${token}`;
            localStorage.setItem("storiesToken", storiesToken);
            axios.defaults.headers.common["Authorization"] = storiesToken;
        } else {
            throw new Error(error);
        }
    } catch (err) {
        dispatch({
            type: type.LOGIN_FAIL,
            payload: err,
        });
    }
};
