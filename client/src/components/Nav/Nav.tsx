import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

const Navbar = () => {
    return (
        <div className="bg-orange-600 p-2 pl-4 pr-4 flex flex-row justify-between items-center shadow-md">
            <div>
                <img src={logo} width={40} height={40} alt="logo" />
            </div>
            <ul className="flex flex-row gap-2">
                <li>
                    <Link to="/">Home</Link>{" "}
                </li>
                <li>
                    <Link to="/About">About</Link>{" "}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
