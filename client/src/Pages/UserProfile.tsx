import React from "react";
import { connect } from "react-redux";
import { RootState } from "types";
import { BsChevronLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Button from "../components/Button/Button";
import EditProfile from "../components/Modal/EditProfile";
import ChangeImageProfile from "../components/Modal/ChangeImageProfile";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import WhispersList from "../components/WhispersList/WhispersList";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { getAllWhispers } from "../redux/actions/dataActions";
import Loading from "../components/Loading/Loading";
import Container from "../components/Container/Container";

type IUserProfileProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const UserProfile: React.FC<IUserProfileProps> = ({
    error,
    loading,
    getAllWhispers,
    user,
    whispers,
}) => {
    const history = useHistory();
    const [editModal, updateEditModal] = React.useState<boolean>(false);
    const [imageModal, updateImageModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user !== null && user.userName !== undefined) {
            getAllWhispers(`/whispers/${user.userName}`);
        }
    }, [getAllWhispers, user]);

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
            <Container>
                <Button
                    title="Edit Profile"
                    looks="main"
                    onClick={() => updateEditModal(!editModal)}
                />
            </Container>
            {editModal && <EditProfile setModalStatus={updateEditModal} />}
            {imageModal && (
                <ChangeImageProfile setModalStatus={updateImageModal} />
            )}
            {loading === "pending" ? (
                <Loading />
            ) : loading === "error" && error !== "" ? (
                <div>{error}</div>
            ) : (
                <WhispersList whispers={whispers} excludeUser={true} />
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        error: state.data.dataError,
        loading: state.data.loadingData,
        user: state.user.credentials,
        whispers: state.data.whispers,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            getAllWhispers,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
