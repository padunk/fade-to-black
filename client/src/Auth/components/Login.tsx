import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import { logIn } from "../../redux/actions/userActions";

const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").defined(),
    password: Yup.string()
        .trim()
        .min(8, "Too short")
        .max(16, "Too long")
        .defined(),
});

type ILoginProps = {
    errorMessage: string;
    loading: boolean;
    logIn: typeof logIn;
    updateForm: (s: string) => void;
};

const Login: React.FC<ILoginProps> = ({
    errorMessage,
    loading,
    logIn,
    updateForm,
}) => {
    const history = useHistory();
    return (
        <div>
            <h2 className="text-2xl text-center font-bold text-orange-400">
                Login
            </h2>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    logIn(values, history, "/feed");
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
                                Don't have an Account?{" "}
                                <span
                                    className="cursor-pointer text-orange-300 underline"
                                    onClick={() => updateForm("signup")}
                                >
                                    Sign Up
                                </span>
                            </p>
                            <p>
                                <span
                                    className="cursor-pointer text-orange-300 underline"
                                    onClick={() => updateForm("forgotPassword")}
                                >
                                    Forgot Password?
                                </span>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
