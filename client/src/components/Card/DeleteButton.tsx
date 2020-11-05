import React from "react";
import { TiDelete } from "react-icons/ti";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { deleteWhisper } from "../../redux/actions/dataActions";

type IDeleteButtonProps = ReturnType<typeof mapDispatchToPros> & {
    id: string;
};

const DeleteButton: React.FC<IDeleteButtonProps> = ({ deleteWhisper, id }) => {
    const history = useHistory();
    return (
        <div
            className="absolute right-0 top-0 mt-1 mr-2 text-red-700 fill-current cursor-pointer"
            onClick={() => deleteWhisper(id, history)}
        >
            <TiDelete className="fill-current" size={20} />
        </div>
    );
};

const mapDispatchToPros = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            deleteWhisper,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToPros)(DeleteButton);
