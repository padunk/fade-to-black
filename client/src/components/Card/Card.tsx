import React from "react";
import { Whisper } from "types";
import CardBody from "./CardBody";
import CardUser from "./CardUser";

type ICardProps = {
    excludeUser?: boolean;
    whisper: Whisper;
};

const Card: React.FC<ICardProps> = ({ excludeUser, whisper }) => {
    return (
        <div className="flex my-8 rounded-lg bg-gray-500 max-w-sm w-64 mx-auto lg:w-auto">
            {excludeUser === undefined && <CardUser whisper={whisper} />}
            <CardBody whisper={whisper} />
        </div>
    );
};

export default Card;
