import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { axios } from "../Axios";
import { logOut } from "../redux/actions/userActions";
import { RootState, Whisper } from "types";

import Button from "../components/Button/Button";
import user1 from "../assets/images/user1.jpg";
import user2 from "../assets/images/user2.jpg";
import user3 from "../assets/images/user3.jpg";
import Card from "../components/Card/Card";

const fakeData = [
    {
        body: "post from user3",
        commentCount: 0,
        createdAt: 1603075929268,
        id: "xn7hHdmHJeqSYGX8syzt",
        lifeTime: 300000,
        likeCount: 0,
        userImage: user3,
        userName: "user3",
    },
    {
        body: "test from postman",
        commentCount: 2,
        createdAt: 1602993808935,
        id: "Snr2IK0HnetDu51GSx18",
        lifeTime: 300000,
        likeCount: 0,
        userImage: user2,
        userName: "user1",
    },
    {
        body: "hello again...",
        commentCount: 1,
        createdAt: 1602223200000,
        id: "HzxggYT2Z6hZSGjQkA4O",
        lifeTime: 300000,
        likeCount: 0,
        userImage: user1,
        userName: "user",
    },
];

const Feed = ({ imageURL, logOut, userName }: any) => {
    const history = useHistory();
    const [whispers, setWhispers] = React.useState<Whisper[]>(fakeData);
    const [fetchStatus, updateFetchStatus] = React.useState<string>("loading");
    const [error, updateError] = React.useState<string>("");

    React.useEffect(() => {
        const getAllWhispers = async (url: string) => {
            updateFetchStatus("loading");
            updateError("");
            try {
                const response = await axios.get(url);
                const data = await response.data;
                updateFetchStatus("success");
                console.log("data :>> ", data);
                setWhispers(data);
            } catch (err) {
                console.log("error :>> ", err);
                updateFetchStatus("fail");
                updateError(err);
            }
        };

        // getAllWhispers("/whispers");
    }, []);

    return (
        <div>
            <header className="flex justify-between items-center bg-orange-400 shadow-sm py-2 px-4">
                <img
                    src={require("../assets/images/user1.jpg")}
                    alt={`${userName} avatar`}
                    className="w-10 h-10 rounded-full border-2 border-purple-600"
                />
                <span className="text-purple-100 italic text-2xl">
                    OurStories
                </span>
                <Button
                    title="Log Out"
                    looks="ghost"
                    onClick={() => logOut(history)}
                />
            </header>
            <section>
                {fetchStatus === "loading" ? (
                    <div>Loading</div>
                ) : fetchStatus === "fail" && error ? (
                    <div>
                        <p> Error getting stories, please try again later.</p>
                        <p>{error}</p>
                    </div>
                ) : whispers.length === 0 ? (
                    <div>
                        <p>No Stories found. </p>
                        <p>
                            Please check your internet connection or refresh
                            your browser.
                        </p>
                    </div>
                ) : (
                    <div>
                        {whispers.map((whisper) => {
                            return <Card whisper={whisper} key={whisper.id} />;
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    const imageURL = state.user.credentials?.imageURL;
    const userName = state.user.credentials?.userName;

    return {
        imageURL,
        userName,
    };
};

const mapDispatchToProps = {
    logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
