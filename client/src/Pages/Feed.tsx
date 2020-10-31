import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
    const [fetchStatus, updateFetchStatus] = React.useState<string>("success");
    const [error, updateError] = React.useState<string>("");

    React.useEffect(() => {
        const getAllWhispers = async (url: string) => {
            updateFetchStatus("loading");
            updateError("");
            try {
                const response = await axios.get(url);
                const data = await response.data;
                updateFetchStatus("success");
                setWhispers(data);
            } catch (err) {
                console.log("error :>> ", err);
                updateFetchStatus("fail");
                updateError(err);
            }
        };

        // getAllWhispers("/whispers");
    }, []);

    const showUserDetail = () => {
        console.log("userdetail");
    };

    return (
        <div>
            <header className="flex justify-between items-center border-b-2 border-gray-800 py-2 px-4">
                <div className="w-12 h-12 rounded-full border-2 border-purple-600 cursor-pointer overflow-hidden">
                    <img
                        src={require("../assets/images/user1.jpg")}
                        alt={`${userName} avatar`}
                        onClick={showUserDetail}
                        className="rounded-full border border-transparent border-solid transform hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <span className="text-purple-100 italic text-2xl">
                    Whispers
                </span>
                <Button
                    title="Log Out"
                    looks="ghost"
                    onClick={() => logOut(history)}
                />
            </header>
            <section>
                {fetchStatus === "loading" ? (
                    <div className="flex justify-center items-center min-w-full min-h-screen">
                        <div className="text-center text-3xl p-2">Loading</div>
                    </div>
                ) : fetchStatus === "fail" && error !== "" ? (
                    <div className="flex justify-center items-center min-w-full min-h-screen">
                        <div className="text-center text-3xl p-2">
                            <p>
                                {" "}
                                Error getting stories, please try again later.
                            </p>
                            <p>{error}</p>
                        </div>
                    </div>
                ) : whispers.length === 0 ? (
                    <div className="flex justify-center items-center min-w-full min-h-screen">
                        <div className="text-center text-3xl p-2">
                            <p>No Stories found. </p>
                            <p>
                                Please check your internet connection or refresh
                                your browser.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center flex-col max-w-screen-md m-auto">
                        {whispers.map((whisper) => {
                            return (
                                <Link
                                    key={whisper.id}
                                    to={`/whisper/${whisper.id}`}
                                >
                                    <Card whisper={whisper} />
                                </Link>
                            );
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
