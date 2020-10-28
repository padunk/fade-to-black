import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiTwotoneFire } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { Whisper } from "types";

dayjs.extend(relativeTime);

type ICardProps = {
    whisper: Whisper;
};

const Card: React.VFC<ICardProps> = ({ whisper }) => {
    return (
        <div className="flex my-8 mx-4 rounded-lg bg-gray-500">
            <div className="flex-1 px-4">
                <div className="w-20 m-auto -mt-3">
                    <img
                        src={whisper.userImage}
                        alt={`${whisper.userName} profile`}
                        className="block object-cover rounded-lg shadow-md"
                    />
                </div>
                <div>
                    <p>{whisper.lifeTime}</p>
                </div>
            </div>
            <div className="flex-auto p-2">
                <div>
                    <p className="text-black">{whisper.body}</p>
                </div>
                <div>
                    <span className="text-gray-700 text-xs">
                        {dayjs().to(dayjs(whisper.createdAt))}
                    </span>
                </div>
                <div>
                    <div className="mt-1 flex justify-between px-1">
                        <div className="flex justify-center items-center">
                            <AiTwotoneFire fill="gray" />
                            <span className="text-gray-700 text-xs px-1">
                                {whisper.likeCount}
                            </span>
                        </div>
                        <div className="flex justify-center items-center">
                            <MdModeComment fill="gray" />
                            <span className="text-gray-700 text-xs px-1">
                                {whisper.commentCount}
                            </span>
                            <GoChevronDown fill="gray" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
