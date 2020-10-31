import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";
import { Whisper } from "types";

export const getAllWhispers = (url: string) => async (
    dispatch: Dispatch
): Promise<void> => {
    dispatch({
        type: type.FETCH_START,
    });
    try {
        const response = await axios.get(url);
        const data: Whisper[] = await response.data;
        dispatch({
            type: type.FETCH_WHISPERS,
            payload: data,
        });
    } catch (err) {
        if (err.response.hasOwnProperty("data")) {
            dispatch({
                type: type.FETCH_FAIL,
                payload: err.response.data.error,
            });
        } else {
            dispatch({
                type: type.FETCH_FAIL,
                payload: "Something went wrong, please try again later.",
            });
        }
    }
};

export const addWhisper = (content: { body: string }) => async (
    dispatch: Dispatch
): Promise<void> => {
    dispatch({
        type: type.FETCH_START,
    });
    try {
        const response = await axios.post("/whisper", content);
        const data = await response.data;
        dispatch({
            type: type.ADD_WHISPER,
            payload: [data],
        });
    } catch (err) {
        if (err.response.hasOwnProperty("data")) {
            dispatch({
                type: type.FETCH_FAIL,
                payload: err.response.data.error,
            });
        } else {
            dispatch({
                type: type.FETCH_FAIL,
                payload: "Something went wrong, please try again later.",
            });
        }
    }
};
