import React from "react";
import { Link } from "react-router-dom";
import { Whisper } from "types";
import { BiPieChart } from "react-icons/bi";

type ICardUserProps = {
    whisper: Whisper;
};

const CardUser: React.FC<ICardUserProps> = (props) => {
    const { whisper } = props;
    return (
        <div className="flex-1 px-4 pb-4">
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
                <p className="flex gap-2 text-gray-700 fill-current items-center">
                    <BiPieChart className="fill-current" />
                    <span className="text-gray-700 text-xs">
                        {" "}
                        {whisper.lifeTime / 60000} mins
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CardUser;
