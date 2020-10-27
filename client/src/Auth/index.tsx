import React from "react";
import { connect } from "react-redux";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { forgotPassword, logIn, signUp } from "../redux/actions/userActions";
import { clearError } from "../redux/actions/uiActions";
import Welcome from "./components/Welcome";

const Auth = ({
    authenticated,
    clearError,
    credentials,
    errorMessage,
    forgotPassword,
    logIn,
    loading,
    signUp,
}: any) => {
    const [formType, setFormType] = React.useState<string>("login");

    const updateForm = (form: string) => {
        setFormType(form);
        clearError();
    };

    const renderForm = () => {
        if (authenticated) {
            return <Welcome credentials={credentials} />;
        } else {
            switch (formType) {
                case "login":
                    return (
                        <Login
                            setFormType={updateForm}
                            logIn={logIn}
                            loading={loading}
                            errorMessage={errorMessage}
                        />
                    );
                case "signup":
                    return (
                        <SignUp
                            errorMessage={errorMessage}
                            loading={loading}
                            setFormType={updateForm}
                            signUp={signUp}
                        />
                    );
                case "forgotPassword":
                    return (
                        <ForgotPassword
                            errorMessage={errorMessage}
                            forgotPassword={forgotPassword}
                            loading={loading}
                            setFormType={updateForm}
                        />
                    );
                default:
                    return <p>Unknown Type</p>;
            }
        }
    };

    return (
        <div className="w-full h-1/2 flex justify-center mt-2 lg:mt-0 lg:items-center lg:min-h-full">
            {renderForm()}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const { errorMessage, loading } = state.ui;
    const { authenticated, credentials } = state.user;
    return {
        authenticated,
        credentials,
        errorMessage,
        loading,
    };
};

const mapDispatchToProps = {
    clearError,
    forgotPassword,
    logIn,
    signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
