import React from "react";
import { AiTwotoneFire } from "react-icons/ai";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { likeWhisper, unlikeWhisper } from "../../redux/actions/dataActions";
import { RootState, Whisper } from "types";
import { connect } from "react-redux";

type ILikeButtonProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        whisper: Whisper;
    };

const LikeButton: React.FC<ILikeButtonProps> = ({
    likes,
    likeWhisper,
    unlikeWhisper,
    whisper,
}) => {
    const checkLike = (): boolean => {
        if (likes && likes.find((like) => like.whisperID === whisper.id)) {
            return true;
        }
        return false;
    };

    const likeIcon = () =>
        checkLike() ? (
            <AiTwotoneFire
                className="cursor-pointer fill-current"
                onClick={() => unlikeWhisper(whisper.id)}
            />
        ) : (
            <AiTwotoneFire
                className="cursor-pointer"
                fill="gray"
                onClick={() => likeWhisper(whisper.id)}
            />
        );

    return likeIcon();
};

const mapStateToProps = (state: RootState) => {
    return {
        likes: state.user.likes,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            likeWhisper,
            unlikeWhisper,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
