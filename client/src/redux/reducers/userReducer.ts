import { User, UserCredentials, Whisper } from "types";
import * as type from "../actions/constants";

interface SetUserAction {
    type: typeof type.SET_USER;
    payload: UserCredentials;
}

interface SetUserImage {
    type: typeof type.USER_IMAGE_CHANGED;
    payload: string;
}

interface LikeWhisper {
    type: typeof type.LIKE_WHISPER;
    payload: Whisper;
}

interface UnlikeWhisper {
    type: typeof type.UNLIKE_WHISPER;
    payload: Whisper;
}

interface OtherAction {
    type:
        | typeof type.AUTH_ERROR
        | typeof type.LOGIN_FAIL
        | typeof type.SIGNUP_FAIL
        | typeof type.LOGOUT_SUCCESS
        | typeof type.LOGIN_SUCCESS
        | typeof type.SET_AUTH
        | typeof type.SET_UNAUTH;
}

type Actions =
    | LikeWhisper
    | UnlikeWhisper
    | SetUserAction
    | SetUserImage
    | OtherAction;

const userInitialState: User = {
    authenticated: false,
    credentials: null,
    likes: [],
    notifications: [],
};

export const userReducer = (
    state = userInitialState,
    action: Actions
): User => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
        case type.SET_AUTH:
            return {
                ...state,
                authenticated: true,
            };
        case type.AUTH_ERROR:
        case type.LOGIN_FAIL:
        case type.SIGNUP_FAIL:
            return {
                ...state,
                authenticated: false,
            };
        case type.LOGOUT_SUCCESS:
        case type.SET_UNAUTH:
            return {
                authenticated: false,
                credentials: null,
                likes: [],
                notifications: [],
            };
        case type.SET_USER:
            return {
                ...state,
                ...action.payload,
            };
        case type.USER_IMAGE_CHANGED:
            if (state.credentials) {
                return {
                    ...state,
                    credentials: {
                        ...state.credentials,
                        imageURL: action.payload,
                    },
                };
            } else {
                return state;
            }
        case type.LIKE_WHISPER:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userName: state.credentials?.userName,
                        whisperID: action.payload.id,
                    },
                ],
            };
        case type.UNLIKE_WHISPER:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.whisperID !== action.payload.id
                ),
            };
        default:
            return state;
    }
};
