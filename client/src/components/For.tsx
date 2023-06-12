import React from "react";

interface ForProps {
    data: Array<any>;
}

function AudioFeatureRadarChart({ data }: ForProps) {
    return (
        <div>
            {data.map((element: any, idx: number) => (
                <p>{element.name}</p>
            ))}
        </div>
    );
}

export default AudioFeatureRadarChart;
