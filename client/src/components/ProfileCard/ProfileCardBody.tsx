import React from "react";
import { UserCredentials } from "types";

type IProfileCardBodyProps = {
    user: UserCredentials;
};

const ProfileCardBody: React.FC<IProfileCardBodyProps> = ({ user }) => {
    return (
        <div className="mb-8">
            <div>
                <span className="text-gray-500">Bio: </span>
                <p className="whitespace-pre-line">{user?.bio}</p>
            </div>
            <p>
                <span className="text-gray-500">Email: </span>
                <a
                    href={`mailto:${user?.email}`}
                    className="underline text-purple-400"
                >
                    {user?.email}
                </a>
            </p>
            <p>
                <span className="text-gray-500">Website: </span>
                <a
                    href={user?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-purple-400"
                >
                    {user?.website}
                </a>
            </p>
        </div>
    );
};

export default ProfileCardBody;
