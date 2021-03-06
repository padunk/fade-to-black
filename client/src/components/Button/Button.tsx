import React from "react";

interface IButtonProps {
    disabled?: boolean;
    looks: "main" | "ghost" | "danger";
    onClick?: any;
    title: string | React.FC | JSX.Element;
    type?: "button" | "reset" | "submit";
}

const Button: React.FC<IButtonProps> = ({
    disabled,
    looks,
    title,
    type,
    ...props
}) => {
    let twStyle: string;
    const basic =
        "px-2 py-1 rounded-md border-2 font-bold flex justify-center items-center ";

    if (!disabled) {
        const main =
            basic +
            "border-orange-600 bg-orange-500 hover:bg-orange-400 transition-colors duration-300 text-gray-800";
        const ghost =
            basic +
            "border-purple-600 hover:bg-purple-500 transition-colors duration-300 text-gray-200";
        const danger =
            basic +
            "border-red-600 hover:bg-red-300 hover:text-black transition-colors duration-300 text-red-500";

        switch (looks) {
            case "main":
                twStyle = main;
                break;
            case "ghost":
                twStyle = ghost;
                break;
            case "danger":
                twStyle = danger;
                break;
            default:
                twStyle = basic;
                break;
        }
    } else {
        twStyle = basic + "bg-gray-500 text-gray-400 cursor-default";
    }
    return (
        <button className={twStyle} disabled={disabled} type={type} {...props}>
            {title}
        </button>
    );
};

export default Button;
