import React from "react";
import { UserCredentials } from "types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type IWelcomeProps = {
    credentials: UserCredentials | null;
};

const Welcome: React.FC<IWelcomeProps> = ({ credentials }) => {
    const showWelcome = () =>
        credentials !== null ? (
            <div className="flex flex-col justify-center">
                <h2 className="text-4xl text-orange-500">
                    Hi {credentials.userName}!
                </h2>
                <p>You have been logged in for: </p>
                <strong className="block text-4xl text-purple-600">
                    {dayjs().from(dayjs(credentials.lastLogin), true)}
                </strong>
            </div>
        ) : (
            <div>
                <h2 className="text-4xl text-orange-500">
                    Welcome to Our Stories!
                </h2>
            </div>
        );

    return showWelcome();
};

export default Welcome;
