import React from "react";

const Welcome = ({ credentials }: any) => {
    const [userName, setUserName] = React.useState<null | string>(null);
    React.useEffect(() => {
        if (credentials && credentials.userName) {
            setUserName(credentials.userName);
        }
    }, [credentials]);
    return (
        <div>
            <h2>Hi {userName !== null ? userName : ""}!</h2>
            <p>
                You have been logged in for: <span>5 Mins</span>
            </p>
        </div>
    );
};

export default Welcome;
