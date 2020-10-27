import { Dispatch } from "redux";
import * as type from "./constants";

export const clearError = () => (dispatch: Dispatch): void => {
    dispatch({
        type: type.CLEAR_ERROR,
    });
};
