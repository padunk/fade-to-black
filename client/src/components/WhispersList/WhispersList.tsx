import React from "react";
import { Whisper } from "types";
import Card from "../Card/Card";

type IWhispersList = {
    excludeUser?: boolean;
    whispers: Whisper[];
};

const WhispersList: React.FC<IWhispersList> = ({ excludeUser, whispers }) => {
    return (
        <div className="flex justify-center items-center flex-col max-w-screen-lg m-auto divide-y-2 divide-gray-700 lg:divide-y-0 lg:divide-x-2 lg:grid lg:grid-cols-3 gap-4 grid-flow-row-dense">
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
