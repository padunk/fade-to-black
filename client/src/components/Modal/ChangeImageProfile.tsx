import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { connect } from "react-redux";
import { RootState } from "types";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import Button from "../Button/Button";
import Close from "./components/Close";
import ModalContainer from "./components/ModalContainer";
import ModalHeader from "./components/ModalHeader";
import FileInputField from "../InputField/FileInputField";
import { uploadAvatar } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

gsap.registerPlugin(TextPlugin);

const FILE_SIZE = 2000 * 1024; // 2mb
const SUPPORTED_FORMAT_IMAGES = ["image/jpg", "image/jpeg", "image/png"];

const ImageProfileSchema = Yup.object().shape({
    imageProfile: Yup.mixed()
        .test(
            "fileSize",
            "Your image is too big :(",
            (value) => value && value.size <= FILE_SIZE
        )
        .test("fileType", "Please use either JPG or PNG", (value) =>
            SUPPORTED_FORMAT_IMAGES.includes(value.type)
        ),
});

type IAddWhisperProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    };

const ChangeImageProfile: React.FC<IAddWhisperProps> = ({
    errorMessage,
    loading,
    setModalStatus,
    uploadAvatar,
    userName,
}) => {
    const timeline = gsap.timeline({
        repeat: Infinity,
        repeatDelay: 1,
    });

    const [file, setFile] = React.useState<Blob | string>("");
    const history = useHistory();
    const { current: tl } = React.useRef(timeline);
    const uploadProgressElement = React.useRef(null);

    React.useEffect(() => {
        tl.to(uploadProgressElement.current, {
            duration: 0.5,
            text: "Uploading image.",
        })
            .to(uploadProgressElement.current, {
                duration: 0.5,
                text: "Uploading image..",
            })
            .to(uploadProgressElement.current, {
                duration: 0.5,
                text: "Uploading image...",
            });
    }, [tl, uploadProgressElement]);

    return (
        <ModalContainer>
            <Close closeModal={setModalStatus} />
            <div className="-mt-56">
                <ModalHeader title={"Change Image Profile"} />
                {loading && (
                    <p
                        ref={uploadProgressElement}
                        className="text-sm text-center m-0 mb-2"
                    >
                        Uploading image
                    </p>
                )}
                <Formik
                    initialValues={{
                        imageProfile: File,
                    }}
                    validationSchema={ImageProfileSchema}
                    onSubmit={(values) => {
                        const imageData = new FormData();
                        if (values.imageProfile !== undefined) {
                            imageData.append(
                                "image",
                                file,
                                values.imageProfile?.name
                            );
                        }
                        uploadAvatar(imageData, setModalStatus, history);
                    }}
                >
                    {({ isValid, dirty, setFieldValue }) => (
                        <Form className="px-4">
                            <Field
                                name="imageProfile"
                                component={FileInputField}
                                setFieldValue={setFieldValue}
                                setFile={setFile}
                                disabled={loading}
                            />
                            <div className="my-2">
                                <Button
                                    type="submit"
                                    title="Upload"
                                    looks="main"
                                    disabled={!(dirty && isValid) || loading}
                                />
                            </div>
                            {errorMessage && (
                                <span className="text-sm text-red-500">
                                    {errorMessage}
                                </span>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalContainer>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        errorMessage: state.ui.errorMessage,
        loading: state.ui.loading,
        userName: state.user.credentials?.userName,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            uploadAvatar,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeImageProfile);
