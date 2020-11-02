import React from "react";
import { GrClose } from "react-icons/gr";

type IOpenModalProps = {
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Close: React.FC<IOpenModalProps> = ({ openModal }) => {
    return (
        <div
            className="absolute z-20 right-0 top-0 mt-8 mr-8 cursor-pointer text-orange-500 stroke-current"
            onClick={() => openModal(false)}
        >
            <div className="rounded-full bg-white p-2">
                <GrClose className="text-orange-500 stroke-current w-6 md:w-8" />
            </div>
        </div>
    );
};

export default Close;
