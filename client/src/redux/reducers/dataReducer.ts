import { Data, Whisper } from "types";
import * as type from "../actions/constants";

interface FetchFail {
    type: typeof type.FETCH_FAIL;
    payload: string;
}

interface FetchStart {
    type: typeof type.FETCH_START;
}

interface FetchWhisper {
    type: typeof type.FETCH_WHISPER;
    payload: Whisper;
}

interface FetchWhispers {
    type: typeof type.FETCH_WHISPERS;
    payload: Whisper[];
}

interface AddWhisper {
    type: typeof type.ADD_WHISPER;
    payload: Whisper[];
}

interface DeleteWhisper {
    type: typeof type.DELETE_WHISPER;
}

interface LikeWhisper {
    type: typeof type.LIKE_WHISPER;
    payload: Whisper;
}

interface UnlikeWhisper {
    type: typeof type.UNLIKE_WHISPER;
    payload: Whisper;
}

type Actions =
    | AddWhisper
    | FetchWhisper
    | FetchWhispers
    | FetchFail
    | FetchStart
    | DeleteWhisper
    | LikeWhisper
    | UnlikeWhisper;

const dataInitialState: Data = {
    dataError: "",
    loadingData: "pending",
    whisper: {
        body: "",
        commentCount: 0,
        createdAt: 0,
        id: "",
        lifeTime: 0,
        likeCount: 0,
        userImage: "",
        userName: "",
        comments: [],
    },
    whispers: [],
};

export const dataReducer = (state = dataInitialState, action: Actions) => {
    switch (action.type) {
        case type.ADD_WHISPER:
            return {
                ...state,
                dataError: "",
                loadingData: "success",
                whispers: [...state.whispers, ...action.payload],
            };
        case type.FETCH_WHISPER:
            return {
                ...state,
                dataError: "",
                loadingData: "success",
                whisper: action.payload,
            };
        case type.FETCH_WHISPERS:
            return {
                ...state,
                dataError: "",
                loadingData: "success",
                whispers: action.payload,
            };
        case type.FETCH_START:
            return {
                ...state,
                loadingData: "pending",
            };
        case type.FETCH_FAIL:
            return {
                ...state,
                dataError: action.payload,
                loadingData: "fail",
            };
        case type.DELETE_WHISPER:
            return {
                ...state,
                whisper: {},
            };
        case type.LIKE_WHISPER:
        case type.UNLIKE_WHISPER:
            const newWhispers = state.whispers.slice();
            const index = state.whispers.findIndex(
                (whisper) => whisper.id === action.payload.id
            );
            newWhispers[index] = action.payload;
            return {
                ...state,
                whisper:
                    state.whisper.id === action.payload.id && action.payload,
                whispers: newWhispers,
            };
        default:
            return state;
    }
};
