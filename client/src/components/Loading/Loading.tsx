import React from "react";
import { gsap } from "gsap";
import Container from "../Container/Container";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const Loading = () => {
    const timeline = gsap.timeline({
        repeat: Infinity,
        repeatDelay: 1,
        ease: "power2",
        yoyo: true,
    });
    const { current: tl } = React.useRef(timeline);
    const loadingEl = React.useRef(null);

    React.useEffect(() => {
        tl.to(loadingEl.current, {
            duration: 1,
            text: {
                value: "",
            },
        })
            .to(loadingEl.current, {
                duration: 1,
                text: {
                    value: "Made by:",
                    newClass: "text-purple-600",
                },
            })
            .to(loadingEl.current, {
                duration: 1,
                text: {
                    value:
                        "<a href='https://anakagung.com' class='underline'>Abraham Anak Agung</a>",
                    newClass: "text-purple-600",
                },
            });
    }, [loadingEl, tl]);
    return (
        <Container>
            <h2 ref={loadingEl} className="text-orange-500 text-2xl">
                Our Whispers
            </h2>
        </Container>
    );
};

export default Loading;
