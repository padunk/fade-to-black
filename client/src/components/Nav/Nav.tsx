import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { RootState } from "types";

type INavbarProps = {
    authenticated: boolean;
};

const Navbar: React.FC<INavbarProps> = ({ authenticated }) => {
    return (
        <div className="bg-orange-600 p-2 pl-4 pr-4 flex flex-row justify-between items-center py-2">
            <div>
                <img src={logo} width={40} height={40} alt="logo" />
            </div>
            <ul className="flex flex-row gap-2 lg:gap-6 lg:pr-4 font-medium">
                <li>
                    <Link to="/">HOME</Link>{" "}
                </li>
                {authenticated && (
                    <li className="italic">
                        <Link to="/feed">Whispers</Link>{" "}
                    </li>
                )}
                <li>
                    <Link to="/About">ABOUT</Link>{" "}
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    const { authenticated } = state.user;
    return {
        authenticated,
    };
};

export default connect(mapStateToProps)(Navbar);
