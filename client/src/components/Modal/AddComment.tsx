import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { GrClose } from "react-icons/gr";
import Button from "../Button/Button";

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

const AddComment: React.VFC<IAddCommentProps> = ({
    id,
    setModalStatus,
    submitNewComment,
}) => {
    // const submitNewComment = async () => {
    //     try {
    //         setfetchStatus('loading')
    //         await axios.post(``)
    //         // refresh it
    //         await getWhisperDetail(params.whisperID)
    //     } catch (addCommentError) {
    //         console.log('addCommentError :>> ', addCommentError);
    //     }
    // }

    return (
        <div
            className="absolute z-10 inset-0 bg-gray-800 flex justify-center items-center bg-opacity-75"
            style={{ backdropFilter: "blur(35px)" }}
        >
            <div
                className="absolute z-20 right-0 top-0 mt-8 mr-8 cursor-pointer text-orange-500 stroke-current"
                onClick={() => setModalStatus(false)}
            >
                <div className="rounded-full bg-white p-2">
                    <GrClose
                        size={32}
                        className="text-orange-500 stroke-current"
                    />
                </div>
            </div>
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
                {({ errors, touched, isValid, dirty }) => (
                    <Form className="w-2/3 px-8">
                        <Field
                            as="textarea"
                            name="body"
                            type="body"
                            className="py-1 px-2 text-gray-800 w-full"
                            rows={3}
                            placeholder="Comment..."
                            resize="none"
                        />
                        {errors.body && touched.body ? (
                            <span className="text-xs text-red-500 block">
                                {errors.body}
                            </span>
                        ) : null}

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
        </div>
    );
};

export default AddComment;
