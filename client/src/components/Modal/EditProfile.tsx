import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { urlRegex } from "regex";
import { connect } from "react-redux";
import { RootState, UpdateUserProfile } from "types";
import Button from "../Button/Button";
import Close from "./components/Close";
import InputField from "../InputField/InputField";
import ModalContainer from "./components/ModalContainer";
import ModalHeader from "./components/ModalHeader";
import TextAreaField from "../InputField/TextAreaField";
import { editProfile } from "../../redux/actions/userActions";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

const EditProfileSchema = Yup.object().shape({
    bio: Yup.string().trim().min(3, "Too short").max(160, "Too long"),
    email: Yup.string().trim().email("Invalid email"),
    location: Yup.string().trim().min(2, "Too short").max(30, "Too long"),
    protocol: Yup.string(),
    website: Yup.string().trim().matches(urlRegex, "Invalid URL address"),
});

type IEditProfileProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> & {
        setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    };

const EditProfile: React.FC<IEditProfileProps> = ({
    editProfile,
    setModalStatus,
    user,
}) => {
    return (
        <ModalContainer>
            <Close closeModal={setModalStatus} />
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
                    const data: UpdateUserProfile = {
                        bio: values.bio,
                        email: values.email,
                        location: values.location,
                        website: values.protocol + values.website,
                    };

                    editProfile(data);
                    setModalStatus(false);
                }}
            >
                {({ dirty, isValid }) => (
                    <Form className="px-4">
                        <TextAreaField label="Bio" name="bio" />
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
        </ModalContainer>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.credentials,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            editProfile,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
