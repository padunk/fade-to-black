import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { GrClose } from "react-icons/gr";
import Button from "../Button/Button";
import { addWhisper } from "../../redux/actions/dataActions";
import Container from "../Container/Container";
import TextAreaField from "../InputField/TextAreaField";
import ModalHeader from "./components/ModalHeader";
import Close from "./components/Close";

const AddWhisperSchema = Yup.object().shape({
    body: Yup.string()
        .trim()
        .min(3, "Too short")
        .max(160, "Too long")
        .defined(),
});

type IAddWhisperProps = {
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    addWhisper: typeof addWhisper;
};

const AddComment: React.FC<IAddWhisperProps> = ({
    addWhisper,
    setModalStatus,
}) => {
    return (
        <div
            className="absolute z-10 inset-0 bg-gray-800 flex justify-center items-center bg-opacity-75"
            style={{ backdropFilter: "blur(35px)" }}
        >
            <Close openModal={setModalStatus} />
            <Container className="flex-col">
                <ModalHeader title={"Add Whisper"} />
                <Formik
                    initialValues={{
                        body: "",
                    }}
                    validationSchema={AddWhisperSchema}
                    onSubmit={(values) => {
                        setModalStatus(false);
                        addWhisper(values);
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form className="w-full px-8">
                            <TextAreaField
                                name="body"
                                label="Whisper"
                                placeholder="Whispersss..."
                            />
                            <div className="my-2">
                                <Button
                                    type="submit"
                                    title="Add Whisper"
                                    looks="main"
                                    disabled={!(dirty && isValid)}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default AddComment;
