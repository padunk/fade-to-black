import React from "react";
import { useHistory, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { axios } from "../Axios";
import { BsChevronLeft } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { Comments, Whisper } from "types";
import Card from "../components/Card/Card";
import AddComment from "../components/Modal/AddComment";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Loading from "../components/Loading/Loading";

type ParamsObject = {
    whisperID: string;
};

const WhisperDetail = () => {
    const history = useHistory();
    const params: ParamsObject = useParams();
    const [whisper, setWhisper] = React.useState<Whisper | null>(null);
    const [fetchWhisperStatus, setfetchStatus] = React.useState<string>(
        "success"
    );
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [modalStatus, setModalStatus] = React.useState<boolean>(false);

    const getWhisperDetail = async (id: string): Promise<void> => {
        setfetchStatus("loading");
        try {
            const response = await axios.get(`/whisper/${id}`);
            const data = await response.data;
            setfetchStatus("success");
            setWhisper(data);
        } catch (getWhisperError) {
            console.log("getWhisperError :>> ", getWhisperError);
            setfetchStatus("fail");
            setErrorMessage(getWhisperError);
        }
    };

    React.useEffect(() => {
        getWhisperDetail(params.whisperID);
    }, [params.whisperID]);

    const renderComments = (comments: Comments[]) => {
        return comments.map((comment) => {
            return (
                <div
                    key={comment.createdAt}
                    className="p-3 my-5 rounded-lg bg-gray-500"
                >
                    <div>
                        <p className="text-gray-800">{comment.body}</p>
                    </div>
                    <div className="flex flex-col items-end text-sm text-gray-700">
                        <span>{comment.userName}</span>
                        <span>
                            {dayjs(comment.createdAt).format("DD MMM YYYY")}
                        </span>
                    </div>
                </div>
            );
        });
    };

    const submitNewComment = async (id: string, data: { body: string }) => {
        try {
            setfetchStatus("loading");
            await axios.post(`/whisper/${id}/comment`, data);
            // refresh it
            await getWhisperDetail(params.whisperID);
        } catch (addCommentError) {
            console.log("addCommentError :>> ", addCommentError);
        }
    };

    return (
        <div className="flex justify-center flex-col items-center max-w-lg mx-auto">
            <header className="border-gray-800 w-full border-b-2 py-2">
                <div
                    className="cursor-pointer flex"
                    onClick={() => history.goBack()}
                >
                    <BsChevronLeft className="pl-2" size={24} />
                    <span>Back</span>
                </div>
            </header>
            {fetchWhisperStatus === "fail" ? (
                <Container>Error: {errorMessage}</Container>
            ) : whisper === null || fetchWhisperStatus === "loading" ? (
                <Loading />
            ) : (
                <div className="flex flex-col w-full">
                    <Card whisper={whisper} />
                    <div className="mx-auto mb-4">
                        <Button
                            title={
                                <div className="flex justify-around mx-auto items-center">
                                    <span className="pr-4">
                                        Add New Comment
                                    </span>
                                    <GrAdd size={20} />
                                </div>
                            }
                            looks="main"
                            onClick={() => setModalStatus(!modalStatus)}
                        />
                    </div>
                    <p className="pb-1 border-b-2 border-gray-600 text-gray-600">
                        Comments:
                    </p>
                    <div className="overflow-y-auto h-64 pr-8">
                        {whisper.hasOwnProperty("comments") &&
                        whisper.comments?.length === 0 ? (
                            <p>No Comments yet</p>
                        ) : (
                            whisper.comments && renderComments(whisper.comments)
                        )}
                    </div>
                </div>
            )}
            {/* MODAL */}
            {modalStatus && (
                <AddComment
                    setModalStatus={setModalStatus}
                    id={whisper?.id}
                    submitNewComment={submitNewComment}
                />
            )}
        </div>
    );
};

export default WhisperDetail;
