import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import TextAreaField from "../InputField/TextAreaField";
import Container from "../Container/Container";
import ModalHeader from "./components/ModalHeader";
import Close from "./components/Close";
import ModalContainer from "./components/ModalContainer";

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
        <ModalContainer>
            <Close closeModal={setModalStatus} />
            <Container className="flex-col">
                <ModalHeader title={"Add Comment"} />
                <Formik
                    initialValues={{
                        body: "",
                    }}
                    validationSchema={AddCommentSchema}
                    onSubmit={(values) => {
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
        </ModalContainer>
    );
};

export default AddComment;
