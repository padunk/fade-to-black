import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { urlRegex } from "regex";
import { connect } from "react-redux";
import { RootState } from "types";
import Close from "./components/Close";
import ModalHeader from "./components/ModalHeader";

const EditProfileSchema = Yup.object().shape({
    bio: Yup.string().trim().min(3, "Too short").max(160, "Too long"),
    email: Yup.string().trim().email("Invalid email").defined(),
    location: Yup.string().trim().min(2, "Too short").max(30, "Too long"),
    website: Yup.string().trim().matches(urlRegex, "Invalid URL address"),
});

type IEditProfileProps = ReturnType<typeof mapStateToProps> & {
    setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfile: React.FC<IEditProfileProps> = ({
    user,
    setEditProfileModal,
}) => {
    return (
        <div
            className="absolute z-10 inset-0 bg-gray-800 flex flex-col justify-center items-center bg-opacity-75"
            style={{
                backdropFilter: "blur(30px)",
                height: "calc(100vh - 72px)",
            }}
        >
            <Close openModal={setEditProfileModal} />
            <ModalHeader title={"Edit Profile"} />
            <Formik
                initialValues={{
                    bio: `${user?.bio}`,
                    email: `${user?.email}`,
                    location: `${user?.location}`,
                    protocol: "https://",
                    website: `${user?.website}`,
                }}
                validationSchema={EditProfileSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ dirty, isValid }) => (
                    <Form className="px-4">
                        <InputField label="Bio" name="bio" />
                        <InputField label="Email" name="email" />
                        <InputField label="Location" name="location" />
                        <div className="flex">
                            <InputField
                                label="Website"
                                name="protocol"
                                disabled={true}
                            />
                            <InputField name="website" />
                        </div>
                        <div className="my-2">
                            <Button
                                type="submit"
                                title="Submit"
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

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.credentials,
    };
};

export default connect(mapStateToProps)(EditProfile);
