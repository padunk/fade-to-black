import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import Container from "../Container/Container";
import ModalHeader from "./components/ModalHeader";
import Close from "./components/Close";
import FileInputField from "../InputField/FileInputField";
import { axios } from "../../Axios";

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

type IAddWhisperProps = {
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangeImageProfile: React.FC<IAddWhisperProps> = ({ setModalStatus }) => {
    const [file, setFile] = React.useState<Blob | string>("");
    const [errorUpload, setErrorUpload] = React.useState<string>("");

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
                        axios
                            .post("/user/image", imageData)
                            .then(() => setModalStatus(false))
                            .catch((err) => {
                                console.log("err", err);
                                setErrorUpload(err.message);
                            });
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
                                    disabled={!(dirty && isValid)}
                                />
                            </div>
                            {errorUpload && (
                                <span className="text-sm text-red-500">
                                    {errorUpload}
                                </span>
                            )}
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default ChangeImageProfile;
