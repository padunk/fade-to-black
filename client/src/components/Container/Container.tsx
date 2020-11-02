import * as React from "react";

type IContainerProps = {
    children: React.ReactNode;
    className?: string;
};

const Container: React.VFC<IContainerProps> = (props) => {
    const defaultClassName = " flex justify-center items-center ";
    return (
        <div
            {...props}
            className={props.className && props.className + defaultClassName}
        >
            {props.children}
        </div>
    );
};

export default Container;
