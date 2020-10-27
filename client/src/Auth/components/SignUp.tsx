import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import { signUp } from "../../redux/actions/userActions";

const SignUpSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").defined(),
    password: Yup.string().min(8, "Too short").max(16, "Too long").defined(),
    userName: Yup.string()
        .trim()
        .min(3, "Too short")
        .max(16, "Too long")
        .defined(),
});

type ISignUpProps = {
    errorMessage: string;
    loading: boolean;
    signUp: typeof signUp;
    updateForm: (s: string) => void;
};

const SignUp: React.FC<ISignUpProps> = ({
    errorMessage,
    loading,
    signUp,
    updateForm,
}) => {
    return (
        <div>
            <h2 className="text-2xl text-center font-bold text-orange-400">
                Sign Up
            </h2>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    userName: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    signUp(values, updateForm);
                }}
            >
                {({ errors, touched, dirty, isValid }) => (
                    <Form className="text-purple-200 text-sm">
                        <p>
                            Email:{" "}
                            {errors.email && touched.email ? (
                                <span className="text-xs text-red-500">
                                    {errors.email}
                                </span>
                            ) : null}
                        </p>
                        <Field
                            name="email"
                            type="email"
                            className="py-1 px-2 text-gray-800"
                        />

                        <p className="mt-2">
                            User Name:{" "}
                            {errors.userName && touched.userName ? (
                                <span className="text-xs text-red-500">
                                    {errors.userName}
                                </span>
                            ) : null}
                        </p>
                        <Field
                            name="userName"
                            type="text"
                            className="py-1 px-2 text-gray-800"
                        />

                        <p className="mt-2">
                            Password:{" "}
                            {errors.password && touched.password ? (
                                <span className="text-xs text-red-500">
                                    {errors.password}
                                </span>
                            ) : null}
                        </p>
                        <Field
                            name="password"
                            type="password"
                            className="py-1 px-2 text-gray-800"
                        />
                        {errorMessage !== "" && (
                            <p className="text-sm text-red-500">
                                {errorMessage}
                            </p>
                        )}
                        <div className="my-2">
                            <Button
                                type="submit"
                                title="Submit"
                                looks="main"
                                disabled={!(dirty && isValid) || loading}
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>
                                Already have an Account?{" "}
                                <span
                                    className="cursor-pointer text-orange-300 underline"
                                    onClick={() => updateForm("login")}
                                >
                                    Log In
                                </span>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
