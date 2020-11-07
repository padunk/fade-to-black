import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import Container from "../Container/Container";
import ModalHeader from "./components/ModalHeader";
import Close from "./components/Close";
import FileInputField from "../InputField/FileInputField";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { uploadAvatar } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { RootState } from "types";

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
}) => {
    const [file, setFile] = React.useState<Blob | string>("");

    return (
        <div
            className="absolute z-10 inset-0 bg-gray-800 flex justify-center items-center bg-opacity-75"
            style={{
                backdropFilter: "blur(35px)",
                minHeight: "calc(100vh - 72px)",
            }}
        >
            <Close openModal={setModalStatus} />
            <Container className="flex-col">
                <ModalHeader title={"Change Image Profile"} />
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
                        uploadAvatar(imageData, setModalStatus);
                    }}
                >
                    {({ isValid, dirty, setFieldValue }) => (
                        <Form className="w-full px-8">
                            <Field
                                name="imageProfile"
                                component={FileInputField}
                                setFieldValue={setFieldValue}
                                setFile={setFile}
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
            </Container>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        errorMessage: state.ui.errorMessage,
        loading: state.ui.loading,
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
