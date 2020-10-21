import React from "react";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Auth = () => {
    const [formType, setFormType] = React.useState("login");

    const renderForm = () => {
        switch (formType) {
            case "login":
                return <Login setFormType={setFormType} />;
            case "signup":
                return <SignUp setFormType={setFormType} />;
            case "forgotPassword":
                return <ForgotPassword setFormType={setFormType} />;
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

export default Auth;
