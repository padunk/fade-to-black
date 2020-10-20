import React from "react";
import background from "../../assets/images/hero.jpg";

const Hero = () => {
    return (
        <div
            className="relative w-screen rounded-md bg-no-repeat bg-cover bg-center flex justify-center"
            style={{
                backgroundImage: `url(${background})`,
                height: "30vh",
            }}
        >
            <div
                className="pl-4 pr-4 pt-8 font-bold text-lg text-orange-300"
                style={{ backgroundColor: "rgba(0,0,0, 0.6)" }}
            >
                <h1>Our Stories</h1>
                <p>is all about what we write now and</p>
                <p>what will be forgotten soon...</p>
            </div>
        </div>
    );
};

export default Hero;
