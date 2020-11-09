import React from "react";
import { gsap } from "gsap";
import Container from "../Container/Container";

const Loading = () => {
    React.useEffect(() => {
        const tl = gsap.timeline({
            repeat: Infinity,
            repeatDelay: 1,
            ease: "power2",
            yoyo: true,
        });

        tl.to(".loading", {
            duration: 2,
            text: {
                value: "Our Whispers",
            },
        })
            .to(".loading", {
                duration: 1,
                text: "",
            })
            .to(".loading", {
                duration: 2,
                text: "Made by Abraham Anak Agung",
            });
    });
    return (
        <Container>
            <h2 className="loading text-orange-500"></h2>
        </Container>
    );
};

export default Loading;
