import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { GrClose } from "react-icons/gr";
import Button from "../Button/Button";
import TextAreaField from "../InputField/TextAreaField";
import Container from "../Container/Container";
import ModalHeader from "./components/ModalHeader";
import Close from "./components/Close";

const AddCommentSchema = Yup.object().shape({
    body: Yup.string()
        .trim()
        .min(3, "Too short")
        .max(160, "Too long")
        .defined(),
});

type IAddCommentProps = {
    id: string | undefined;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    submitNewComment: (s: string, d: { body: string }) => Promise<void>;
};

const AddComment: React.FC<IAddCommentProps> = ({
    id,
    setModalStatus,
    submitNewComment,
}) => {
    return (
        <div
            className="absolute z-10 inset-0 bg-gray-800 flex justify-center items-center bg-opacity-75"
            style={{ backdropFilter: "blur(35px)" }}
        >
            <Close openModal={setModalStatus} />
            <Container className="flex-col">
                <ModalHeader title={"Add Comment"} />
                <Formik
                    initialValues={{
                        body: "",
                    }}
                    validationSchema={AddCommentSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        setModalStatus(false);
                        if (id) {
                            submitNewComment(id, values);
                        }
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form className="w-full px-8">
                            <TextAreaField
                                name="body"
                                label="Comment"
                                placeholder="Comment..."
                            />
                            <div className="my-2">
                                <Button
                                    type="submit"
                                    title="Add Comment"
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
