import React from "react";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Auth = () => {
    return (
        <div>
            <Login />
            <SignUp />
            <ForgotPassword />
        </div>
    );
};

export default Auth;
