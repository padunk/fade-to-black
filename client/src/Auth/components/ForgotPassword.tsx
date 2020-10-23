import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").defined(),
});

const ForgotPassword = ({ setFormType, setFormState }: any) => {
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
                onSubmit={(values) => {
                    setFormState(values);
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
                        <div className="my-2">
                            <Button
                                type="submit"
                                title="Submit"
                                looks="main"
                                disabled={!(dirty && isValid)}
                            />
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>
                                Already have an Account?{" "}
                                <span
                                    className="cursor-pointer text-orange-300 underline"
                                    onClick={() => setFormType("login")}
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
