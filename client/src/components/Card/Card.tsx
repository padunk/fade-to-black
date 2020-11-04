import React from "react";
import { Whisper } from "types";
import CardBody from "./CardBody";
import CardUser from "./CardUser";

type ICardProps = {
    excludeUser?: boolean;
    whisper: Whisper;
};

const Card: React.FC<ICardProps> = ({ excludeUser, whisper }) => {
    const [like, setLike] = React.useState<boolean>(false);

    React.useEffect(() => {
        // did user already like a whisper?
    }, []);

    const likeWhisper = async (id: string): Promise<void> => {
        try {
            // axios.post(`/whisper/${id}/like`);
            setLike(!like);
        } catch (likeWhisperError) {
            console.log("likeWhisperError :>> ", likeWhisperError);
        }
    };

    return (
        <div className="flex my-8 mx-4 rounded-lg bg-gray-500 max-w-sm w-64 mx-auto">
            {excludeUser === undefined && <CardUser whisper={whisper} />}
            <CardBody like={like} likeWhisper={likeWhisper} whisper={whisper} />
        </div>
    );
};

export default Card;
