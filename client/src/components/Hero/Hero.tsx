import React from "react";
import background from "../../assets/images/hero.jpg";

const Hero = () => {
    return (
        <div
            className="relative h-1/2 w-full rounded-md bg-no-repeat bg-cover bg-center flex justify-center lg:min-h-full"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div
                style={{
                    backdropFilter: "blur(1.5px)",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <svg
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                className="absolute right-0 min-h-full w-32 -mr-16 hidden lg:block z-10"
                style={{ fill: "#1a202c" }}
            >
                <polygon points="0,0 50,0 100,100 50,100" />
            </svg>
            <div
                className="pl-4 pr-4 pt-8 text-orange-200 w-full lg:pl-8 relative"
                style={{ backgroundColor: "rgba(0,0,0, 0.4)" }}
            >
                <h1 className="font-bold text-4xl lg:text-6xl text-orange-400">
                    Our Stories
                </h1>
                <p>is all about what we write now and</p>
                <p>what will be forgotten soon...</p>
            </div>
        </div>
    );
};

export default Hero;
