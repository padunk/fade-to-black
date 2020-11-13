import { Dispatch } from "redux";
import { axios } from "../../Axios";
import * as type from "./constants";
import { Whisper } from "types";
import * as H from "history";

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

export const deleteWhisper = (id: string, history: H.History) => async (
    dispatch: Dispatch
) => {
    try {
        await axios.delete(`/whisper/${id}/delete`);
        dispatch({
            type: type.DELETE_WHISPER,
            payload: id,
        });
        history.push("/feed");
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

export const likeWhisper = (whisperID: string) => async (
    dispatch: Dispatch
) => {
    try {
        const response = await axios.get(`/whisper/${whisperID}/like`);
        const data = await response.data;
        dispatch({
            type: type.LIKE_WHISPER,
            payload: data,
        });
    } catch (err) {
        console.log("err", err);
    }
};

export const unlikeWhisper = (whisperID: string) => async (
    dispatch: Dispatch
) => {
    try {
        const response = await axios.get(`/whisper/${whisperID}/unlike`);
        const data = await response.data;
        dispatch({
            type: type.UNLIKE_WHISPER,
            payload: data,
        });
    } catch (err) {
        console.log("err", err);
    }
};
