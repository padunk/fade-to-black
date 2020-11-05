import React from "react";
import { Whisper } from "types";
import { axios } from "../../Axios";
import CardBody from "./CardBody";
import CardUser from "./CardUser";
import { RootState } from "types";
import { connect } from "react-redux";

type ICardProps = ReturnType<typeof mapStateToProps> & {
    excludeUser?: boolean;
    whisper: Whisper;
};

const Card: React.FC<ICardProps> = ({ excludeUser, userName, whisper }) => {
    const [like, setLike] = React.useState<boolean>(false);

    React.useEffect(() => {
        // did user already like a whisper?
        const getIsLike = async (userName: string, whisperID: string) => {
            try {
                const response = await axios.post(`/whisper/is-like`, {
                    userName,
                    whisperID,
                });
                const data = await response;
                setLike(data.data.message);
            } catch (err) {
                console.log("err :>> ", err);
            }
        };
        if (userName) getIsLike(userName, whisper.id);
    }, [userName, whisper.id]);

    const likeWhisper = async (id: string): Promise<void> => {
        try {
            if (like) {
                await axios.post(`/whisper/${id}/unlike`);
            } else {
                await axios.post(`/whisper/${id}/like`);
            }
            setLike(!like);
        } catch (likeWhisperError) {
            console.log("likeWhisperError :>> ", likeWhisperError);
        }
    };

    return (
        <div className="flex my-8 rounded-lg bg-gray-500 max-w-sm w-64 mx-auto">
            {excludeUser === undefined && <CardUser whisper={whisper} />}
            <CardBody like={like} likeWhisper={likeWhisper} whisper={whisper} />
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        userName: state.user.credentials?.userName,
    };
};

export default connect(mapStateToProps)(Card);
