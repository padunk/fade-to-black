import React from "react";

type IModalHeaderProps = {
    title: string;
};

const ModalHeader: React.FC<IModalHeaderProps> = ({ title }) => {
    return (
        <h2 className="border-b border-orange-100 border-opacity-75 pb-2 text-xl text-center mb-8 text-orange-500">
            {title}
        </h2>
    );
};

export default ModalHeader;
