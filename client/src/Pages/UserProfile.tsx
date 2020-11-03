import React from "react";
import { connect } from "react-redux";
import { RootState } from "types";
import { BsChevronLeft } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Button from "../components/Button/Button";
import EditProfile from "../components/Modal/EditProfile";
import ChangeImageProfile from "../components/Modal/ChangeImageProfile";

type IUserProfileProps = ReturnType<typeof mapStateToProps>;

const UserProfile: React.FC<IUserProfileProps> = ({ user }) => {
    const history = useHistory();
    const [modalStatus, setModalStatus] = React.useState<boolean>(false);
    const [updateImageModal, setUpdateImageModal] = React.useState<boolean>(
        false
    );

    return (
        <div className="relative">
            <header className="border-gray-800 w-full border-b-2 py-2">
                <div
                    className="cursor-pointer flex"
                    onClick={() => history.goBack()}
                >
                    <BsChevronLeft className="pl-2" size={24} />
                    <span>Back</span>
                </div>
            </header>
            <div className="flex flex-col items-center p-6 mb-6 justify-center shadow-lg bg-gray-800 rounded-md mt-2 mx-auto max-w-lg">
                <div className="border-b border-purple-800 w-full mb-8 pb-2 text-orange-500 stroke-current">
                    <div className="flex flex-col items-center">
                        <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-purple-300 mx-auto">
                            {/* <img src={user?.imageURL} alt={user?.userName} /> */}
                            <img
                                src={require("../assets/images/user1.jpg")}
                                alt={user?.userName}
                                className="object-cover border-2 border-transparent rounded-full"
                            />
                        </div>
                        <FiEdit
                            className="stroke-current ml-32 -mt-3 transform hover:scale-110 transition-transform duration-300 cursor-pointer"
                            onClick={() =>
                                setUpdateImageModal(!updateImageModal)
                            }
                        />
                    </div>
                    <h2 className="text-opacity-75 text-gray-400 text-center">
                        @{user?.userName}
                    </h2>
                </div>
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
                <div>
                    <Button
                        title="Edit Profile"
                        looks="main"
                        onClick={() => setModalStatus(!modalStatus)}
                    />
                </div>
            </div>
            {modalStatus && <EditProfile setModalStatus={setModalStatus} />}
            {updateImageModal && (
                <ChangeImageProfile setModalStatus={setUpdateImageModal} />
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.credentials,
    };
};

export default connect(mapStateToProps)(UserProfile);
