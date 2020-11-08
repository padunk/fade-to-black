import React from "react";
import { connect } from "react-redux";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { forgotPassword, logIn, signUp } from "../redux/actions/userActions";
import { clearError } from "../redux/actions/uiActions";
import Welcome from "./components/Welcome";
import { RootState } from "types";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

type AuthProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof dispatchToProps>;

const Auth: React.FC<AuthProps> = ({
    authenticated,
    clearError,
    credentials,
    errorMessage,
    forgotPassword,
    logIn,
    loading,
    signUp,
}) => {
    const [formType, setFormType] = React.useState<string>("login");

    const updateForm = (form: string): void => {
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
                            updateForm={updateForm}
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
                            updateForm={updateForm}
                            signUp={signUp}
                        />
                    );
                case "forgotPassword":
                    return (
                        <ForgotPassword
                            errorMessage={errorMessage}
                            forgotPassword={forgotPassword}
                            loading={loading}
                            updateForm={updateForm}
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

const mapStateToProps = (state: RootState) => {
    const { errorMessage, loading } = state.ui;
    const { authenticated, credentials } = state.user;
    return {
        authenticated,
        credentials,
        errorMessage,
        loading,
    };
};

const dispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators(
        {
            clearError,
            forgotPassword,
            logIn,
            signUp,
        },
        dispatch
    );
};

export default connect(mapStateToProps, dispatchToProps)(Auth);
