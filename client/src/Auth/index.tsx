import React from "react";
import { connect } from "react-redux";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { logIn } from "../redux/actions/userActions";
import { clearError } from "../redux/actions/uiActions";

const Auth = ({ clearError, errorMessage, logIn, loading }: any) => {
    const [formType, setFormType] = React.useState<string>("login");

    const updateForm = (form: string) => {
        setFormType(form);
        clearError();
    };

    const renderForm = () => {
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
                return <SignUp setFormType={updateForm} />;
            case "forgotPassword":
                return <ForgotPassword setFormType={updateForm} />;
            default:
                return <p>Unknown Type</p>;
        }
    };

    return (
        <div className="w-full h-1/2 flex justify-center mt-2 lg:mt-0 lg:items-center lg:min-h-full">
            {renderForm()}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    console.log("mstp at Auth >>", state);
    const { errorMessage, loading } = state.ui;
    return {
        errorMessage,
        loading,
    };
};

const mapDispatchToProps = {
    logIn,
    clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
