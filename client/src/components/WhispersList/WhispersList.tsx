import React from "react";
import { Whisper } from "types";
import Card from "../Card/Card";

type IWhispersList = {
    excludeUser?: boolean;
    whispers: Whisper[];
};

const WhispersList: React.FC<IWhispersList> = ({ excludeUser, whispers }) => {
    return (
        <div className="flex justify-center items-center flex-col max-w-screen-md m-auto divide-y divide-gray-800">
            {whispers.length === 0 ? (
                <div>No Whispers</div>
            ) : (
                <>
                    {whispers.map((whisper) => (
                        <Card
                            excludeUser={excludeUser}
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
