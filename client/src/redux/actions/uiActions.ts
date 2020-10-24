import { Dispatch } from "redux";
import * as type from "./constants";

export const clearError = () => (dispatch: Dispatch) => {
    dispatch({
        type: type.CLEAR_ERROR,
    });
};
