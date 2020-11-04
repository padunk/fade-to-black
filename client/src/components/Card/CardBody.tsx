import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { Whisper } from "types";
import { AiTwotoneFire } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";

dayjs.extend(relativeTime);

type ICardBodyProps = {
    like: boolean;
    likeWhisper: (id: string) => Promise<void>;
    whisper: Whisper;
};

const CardBody: React.FC<ICardBodyProps> = (props) => {
    const { like, likeWhisper, whisper } = props;
    return (
        <div className="flex-auto p-2">
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
                    <div className="flex justify-center items-center">
                        <AiTwotoneFire
                            className="cursor-pointer"
                            fill={like ? "orangered" : "gray"}
                            onClick={() => likeWhisper(whisper.id)}
                        />
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

export default CardBody;
