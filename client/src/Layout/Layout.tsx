import React from "react";
import Navbar from "../components/Nav/Nav";

const Layout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            <div className="p-2">{children}</div>
        </div>
    );
};

export default Layout;
