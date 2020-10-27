import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import { forgotPassword } from "../../redux/actions/userActions";

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").defined(),
});

type IForgotPasswordProps = {
    errorMessage: string;
    forgotPassword: typeof forgotPassword;
    loading: boolean;
    updateForm: (form: string) => void;
};

const ForgotPassword: React.FC<IForgotPasswordProps> = ({
    errorMessage,
    forgotPassword,
    loading,
    updateForm,
}) => {
    return (
        <div>
            <h2 className="text-2xl text-center font-bold text-orange-400">
                Reset Password
            </h2>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={({ email }): void => {
                    forgotPassword(email, updateForm);
                }}
            >
                {({ errors, touched, isValid, dirty }) => (
                    <Form className="text-sm">
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

export default ForgotPassword;
