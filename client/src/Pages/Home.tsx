import React from "react";
import Hero from "../components/Hero/Hero";
import Auth from "../Auth";

const Home = () => {
    return (
        <div className="flex flex-wrap">
            <Hero />
            <Auth />
        </div>
    );
};

export default Home;
