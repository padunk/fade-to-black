import React from "react";
import { UserCredentials } from "types";
import { FiEdit } from "react-icons/fi";

type IProfileCardHeaderProps = {
    isModalOpen?: boolean;
    user: UserCredentials;
    updateIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileCardHeader: React.FC<IProfileCardHeaderProps> = ({
    isModalOpen,
    user,
    updateIsModalOpen,
}) => {
    return (
        <div className="border-b border-purple-800 w-full mb-8 pb-2 text-orange-500 stroke-current">
            <div className="flex flex-col items-center">
                <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-purple-300 mx-auto">
                    <img
                        src={user?.imageURL}
                        alt={user?.userName}
                        className="object-cover border-2 border-transparent rounded-full"
                    />
                </div>
                {updateIsModalOpen && (
                    <FiEdit
                        className="stroke-current ml-32 -mt-3 transform hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={() => updateIsModalOpen(!isModalOpen)}
                    />
                )}
            </div>
            <h2 className="text-opacity-75 text-gray-400 text-center">
                @{user?.userName}
            </h2>
        </div>
    );
};

export default ProfileCardHeader;
