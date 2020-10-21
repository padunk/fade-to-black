import React from "react";
import Hero from "../components/Hero/Hero";
import Auth from "../Auth";

const Home = () => {
    return (
        <div
            style={{ height: "calc(100vh - 72px)" }}
            className="lg:flex flex-row justify-center items-center"
        >
            <Hero />
            <Auth />
        </div>
    );
};

export default Home;
