import React from "react";
import ProfileCardBody from "./ProfileCardBody";
import ProfileCardHeader from "./ProfileCardHeader";
import { UserCredentials } from "types";

type IProfileCardProps = {
    isModalOpen?: boolean;
    user: UserCredentials;
    updateIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileCard: React.FC<IProfileCardProps> = ({
    isModalOpen,
    updateIsModalOpen,
    user,
}) => {
    return (
        <div className="flex flex-col items-center p-6 mb-6 justify-center shadow-lg bg-gray-800 rounded-md mt-2 mx-auto max-w-lg">
            <ProfileCardHeader
                user={user}
                isModalOpen={isModalOpen}
                updateIsModalOpen={updateIsModalOpen}
            />
            <ProfileCardBody user={user} />
        </div>
    );
};

export default ProfileCard;
