import * as React from "react";

type IContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container: React.VFC<IContainerProps> = (props) => {
    let cln = `flex justify-center items-center `;
    if (props.className) {
        cln += props.className;
    }
    return (
        <div className={cln} {...props}>
            {props.children}
        </div>
    );
};

export default Container;
