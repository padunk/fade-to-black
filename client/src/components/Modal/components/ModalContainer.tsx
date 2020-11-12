import React from "react";
import { gsap } from "gsap";

interface IModalContainerProps {
    children?: React.ReactNode;
}

const ModalContainer: React.FC<IModalContainerProps> = ({ children }) => {
    const modalLayout = React.useRef(null);
    const { current: tl } = React.useRef(gsap.timeline());

    React.useEffect(() => {
        tl.from(modalLayout.current, {
            duration: 1,
            opacity: 0.1,
        });
    }, []);

    return (
        <div
            className="absolute z-10 inset-0 bg-gray-800 flex flex-col justify-center items-center bg-opacity-75"
            style={{
                backdropFilter: "blur(35px)",
                minHeight: "calc(100vh - 72px)",
            }}
            ref={modalLayout}
        >
            {children}
        </div>
    );
};

export default ModalContainer;
