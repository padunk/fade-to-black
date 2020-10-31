import React from "react";
import { connect } from "react-redux";
import { RootState } from "types";

type IUserProfileProps = ReturnType<typeof mapStateToProps>;

const UserProfile: React.FC<IUserProfileProps> = ({ user }) => {
    return (
        <div className="flex justify-between shadow-lg bg-gray-800 rounded-md">
            <div className="rounded-full w-20 h-20 overflow-hidden flex-initial">
                <img src={user?.imageURL} alt={user?.userName} />
            </div>
            <div className="flex-auto">
                <h2>{user?.userName}</h2>
                <p>{user?.bio}</p>
                <p>{user?.email}</p>
                <p>{user?.website}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.credentials,
    };
};

export default connect(mapStateToProps)(UserProfile);
