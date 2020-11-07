import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, Whisper } from "types";
import { MdModeComment } from "react-icons/md";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

dayjs.extend(relativeTime);

type ICardBodyProps = ReturnType<typeof mapStateToProps> & {
    whisper: Whisper;
};

const CardBody: React.FC<ICardBodyProps> = (props) => {
    const { userName, whisper } = props;

    return (
        <div className="flex-auto p-2 relative">
            {whisper.userName === userName && <DeleteButton id={whisper.id} />}
            <Link key={whisper.id} to={`/whisper/${whisper.id}`}>
                <div>
                    <p className="text-black">{whisper.body}</p>
                </div>
                <div>
                    <span className="text-gray-700 text-xs">
                        {dayjs().to(dayjs(whisper.createdAt))}
                    </span>
                </div>
            </Link>
            <div>
                <div className="mt-1 flex justify-between px-1">
                    <div className="flex justify-center items-center text-red-600 fill-current">
                        <LikeButton whisper={whisper} />
                        <span className="text-gray-700 text-xs px-1">
                            {whisper.likeCount} likes
                        </span>
                    </div>
                    <Link key={whisper.id} to={`/whisper/${whisper.id}`}>
                        <div className="flex justify-center items-center text-purple-700 fill-current">
                            <MdModeComment />
                            <span className="text-gray-700 text-xs px-1">
                                {whisper.commentCount}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        userName: state.user.credentials?.userName,
    };
};

export default connect(mapStateToProps)(CardBody);
