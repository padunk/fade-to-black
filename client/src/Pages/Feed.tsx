import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../redux/actions/userActions";
import { addWhisper, getAllWhispers } from "../redux/actions/dataActions";
import { RootState, Whisper } from "types";
import { GrAdd } from "react-icons/gr";

import Button from "../components/Button/Button";
import user1 from "../assets/images/user1.jpg";
import user2 from "../assets/images/user2.jpg";
import user3 from "../assets/images/user3.jpg";
import AddWhisper from "../components/Modal/AddWhisper";
import Container from "../components/Container/Container";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import WhispersList from "../components/WhispersList/WhispersList";

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

type IFeedProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const Feed: React.FC<IFeedProps> = ({
    addWhisper,
    dataError,
    getAllWhispers,
    imageURL,
    loadingData,
    logOut,
    userName,
    // whispers,
}) => {
    const history = useHistory();
    const [addWhisperModalOpen, setAddWhisperModalOpen] = React.useState<
        boolean
    >(false);
    const whispers = fakeData;

    React.useEffect(() => {
        // getAllWhispers("/whispers");
    }, []);

    return (
        <div className="relative">
            <header className="flex justify-between items-center border-b-2 border-gray-800 py-2 px-4">
                <Link to={`/profile/${userName}`}>
                    <div className="w-12 h-12 rounded-full border-2 border-purple-600 cursor-pointer overflow-hidden">
                        <img
                            src={require("../assets/images/user1.jpg")}
                            alt={`${userName} avatar`}
                            className="rounded-full border border-transparent border-solid transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </Link>
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
                {loadingData === "pending" ? (
                    <Container className="min-w-full min-h-screen">
                        <div className="text-center text-3xl p-2">Loading</div>
                    </Container>
                ) : loadingData === "error" && dataError !== "" ? (
                    <Container className="min-w-full min-h-screen">
                        <div className="text-center text-3xl p-2">
                            <p>
                                {" "}
                                Error getting stories, please try again later.
                            </p>
                            <p>{dataError}</p>
                        </div>
                    </Container>
                ) : whispers.length === 0 ? (
                    <Container className="min-w-full min-h-screen">
                        <div className="text-center text-3xl p-2">
                            <p>No Stories found. </p>
                            <p>
                                Please check your internet connection or refresh
                                your browser.
                            </p>
                        </div>
                    </Container>
                ) : (
                    <WhispersList whispers={whispers} />
                )}
            </section>
            <div
                className="absolute right-0 bottom-0 ml-4 mb-4 bg-orange-500 bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => setAddWhisperModalOpen(!addWhisperModalOpen)}
            >
                <GrAdd />
            </div>
            {addWhisperModalOpen && (
                <AddWhisper
                    setModalStatus={setAddWhisperModalOpen}
                    addWhisper={addWhisper}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    const imageURL = state.user.credentials?.imageURL;
    const userName = state.user.credentials?.userName;
    const { data } = state;

    return {
        ...data,
        imageURL,
        userName,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            addWhisper,
            logOut,
            getAllWhispers,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
