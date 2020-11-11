import React from "react";
import { UserCredentials } from "types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { gsap } from "gsap";

dayjs.extend(relativeTime);

type IWelcomeProps = {
    credentials: UserCredentials | null;
};

const Welcome: React.FC<IWelcomeProps> = ({ credentials }) => {
    const [lastLoginTime, updateLastLoginTime] = React.useState<string>("");
    const timeRef = React.useRef(null);

    React.useEffect(() => {
        updateLastLoginTime(dayjs().from(dayjs(credentials?.lastLogin), true));
    }, [credentials]);

    React.useEffect(() => {
        const oneMinute = 60 * 1000; // in ms

        const loginTimeID = setInterval(() => {
            updateLastLoginTime(
                dayjs().from(dayjs(credentials?.lastLogin), true)
            );
            gsap.timeline()
                .to(timeRef.current, {
                    duration: 1,
                    transform: "rotateX(90deg)",
                })
                .to(timeRef.current, {
                    duration: 1,
                    transform: "rotateX(0)",
                });
        }, oneMinute);

        return () => clearInterval(loginTimeID);
    }, [credentials, timeRef.current]);

    const showWelcome = () =>
        credentials !== null ? (
            <div className="flex flex-col justify-center">
                <h2 className="text-4xl text-orange-500">
                    Hi {credentials.userName}!
                </h2>
                <p>You have been logged in for: </p>
                <strong
                    ref={timeRef}
                    className="block text-4xl text-purple-600"
                >
                    {lastLoginTime}
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
