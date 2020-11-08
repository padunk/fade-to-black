import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";
import { Login, SignUp, UpdateUserProfile } from "types";
import * as H from "history";

export const getUserData = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        const response = await axios.get("/user");

        dispatch({
            type: type.SET_USER,
            payload: (await response).data,
        });
    } catch (err) {
        console.log("getUserDataError :>> ", err);
        dispatch({
            type: type.SET_ERROR,
            payload: err.response.data.error,
        });
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
        const data = await response.data;
        const idToken: string = `Bearer ${data.token}`;

        window.localStorage.setItem(type.LOCAL_STORAGE_KEY, idToken);
        axios.defaults.headers.common["Authorization"] = idToken;
        await getUserData()(dispatch);
        dispatch({
            type: type.LOGIN_SUCCESS,
        });
        dispatch({
            type: type.CLEAR_ERROR,
        });
        history.push(redirectPage);
    } catch (err) {
        if (err.response && err.response.hasOwnProperty("data")) {
            dispatch({
                type: type.LOGIN_FAIL,
                payload: err.response.data.error,
            });
        } else {
            dispatch({
                type: type.LOGIN_FAIL,
                payload: "Something went wrong, please try again later.",
            });
        }
    }
};

export const logOut = (history: H.History) => async (
    dispatch: Dispatch
): Promise<void> => {
    localStorage.removeItem(type.LOCAL_STORAGE_KEY);
    try {
        await axios.post("/logout");
        delete axios.defaults.headers.common;
        dispatch({ type: type.LOGOUT_SUCCESS });
    } catch (error) {
        console.error(error);
    } finally {
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
        if (err.response.hasOwnProperty("data")) {
            dispatch({
                type: type.SIGNUP_FAIL,
                payload: err.response.data.error,
            });
        } else {
            dispatch({
                type: type.SIGNUP_FAIL,
                payload: "Something went wrong, please try again later.",
            });
        }
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
        .catch((err) => {
            if (err.response.hasOwnProperty("data")) {
                dispatch({
                    type: type.AUTH_ERROR,
                    payload: err.response.data.error,
                });
            } else {
                dispatch({
                    type: type.AUTH_ERROR,
                    payload: "Something went wrong, please try again later.",
                });
            }
        });
};

export const editProfile = (data: UpdateUserProfile) => async (
    dispatch: Dispatch
): Promise<void> => {
    dispatch({
        type: type.LOADING,
    });

    try {
        await axios.post("/user", data);
        getUserData()(dispatch);
    } catch (err) {
        dispatch({
            type: type.SET_ERROR,
            payload: err.response.data.error,
        });
    }
};

export const uploadAvatar = (
    imageData: FormData,
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
) => async (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: type.LOADING,
    });
    try {
        const response = await axios.post("/user/image", imageData);
        const data = await response.data;
        dispatch({
            type: type.USER_IMAGE_CHANGED,
            payload: data.imageURL,
        });
        dispatch({
            type: type.LOADED,
        });
        setModalStatus(false);
    } catch (err) {
        dispatch({
            type: type.SET_ERROR,
            payload: err.response.data.error,
        });
    }
};
