import React from "react";
import { Whisper } from "types";
import Card from "../Card/Card";

type IWhispersList = {
    whispers: Whisper[];
};

const WhispersList: React.FC<IWhispersList> = (props) => {
    return (
        <div className="flex justify-center items-center flex-col max-w-screen-md m-auto divide-y divide-gray-800">
            {props.whispers.length === 0 ? (
                <div>No Whispers</div>
            ) : (
                <>
                    {props.whispers.map((whisper) => (
                        <Card
                            excludeUser={true}
                            whisper={whisper}
                            key={whisper.id}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default WhispersList;
