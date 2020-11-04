import React from "react";
import { Link } from "react-router-dom";
import { Whisper } from "types";

type ICardUserProps = {
    whisper: Whisper;
};

const CardUser: React.FC<ICardUserProps> = (props) => {
    const { whisper } = props;
    return (
        <div className="flex-1 px-4">
            <div className="w-20 m-auto -mt-3">
                <Link to={`/user/${whisper.userName}`}>
                    <img
                        src={whisper.userImage}
                        alt={`${whisper.userName} profile`}
                        className="block object-cover rounded-lg shadow-md"
                    />
                    <span className="text-gray-700 text-sm mt-1">
                        @{whisper.userName}
                    </span>
                </Link>
            </div>
            <div>
                <p>{whisper.lifeTime}</p>
            </div>
        </div>
    );
};

export default CardUser;
