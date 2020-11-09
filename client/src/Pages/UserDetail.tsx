import React from "react";
import { useParams } from "react-router-dom";
import { axios } from "../Axios";
import Loading from "../components/Loading/Loading";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import WhispersList from "../components/WhispersList/WhispersList";

const UserDetail = () => {
    const params = useParams<{ userName: string }>();
    const [user, setUser] = React.useState<any | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<
        "pending" | "success" | "fail"
    >("pending");
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    React.useEffect(() => {
        const getUserDetails = async (userName: any) => {
            setFetchStatus("pending");
            try {
                const response = await axios.get(`/user/${userName}`);
                const data = await response;

                setUser(data.data);
                setFetchStatus("success");
            } catch (error) {
                console.log("error", error);
                setErrorMessage(error.message);
                setFetchStatus("fail");
            }
        };

        getUserDetails(params.userName);
    }, [params.userName]);
    return (
        <div className="relative">
            {fetchStatus === "pending" ? (
                <Loading />
            ) : fetchStatus === "fail" ? (
                <div>{errorMessage}</div>
            ) : (
                <>
                    <ProfileCard user={user} />
                    <WhispersList whispers={user?.whispers} />
                </>
            )}
        </div>
    );
};

export default UserDetail;
