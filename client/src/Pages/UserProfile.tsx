import React from "react";
import { connect } from "react-redux";
import { RootState } from "types";
import { BsChevronLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Button from "../components/Button/Button";
import EditProfile from "../components/Modal/EditProfile";
import ChangeImageProfile from "../components/Modal/ChangeImageProfile";
import ProfileCard from "../components/ProfileCard/ProfileCard";

type IUserProfileProps = ReturnType<typeof mapStateToProps>;

const UserProfile: React.FC<IUserProfileProps> = ({ user }) => {
    const history = useHistory();
    const [editModal, updateEditModal] = React.useState<boolean>(false);
    const [imageModal, updateImageModal] = React.useState<boolean>(false);

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
            {user !== null && (
                <ProfileCard
                    user={user}
                    isModalOpen={imageModal}
                    updateIsModalOpen={updateImageModal}
                />
            )}
            <div>
                <Button
                    title="Edit Profile"
                    looks="main"
                    onClick={() => updateEditModal(!editModal)}
                />
            </div>
            {editModal && <EditProfile setModalStatus={updateEditModal} />}
            {imageModal && (
                <ChangeImageProfile setModalStatus={updateImageModal} />
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
