import React, { useEffect, useState } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import SpotifyTypes from "spotify-types";
import { TrackFeatures } from "../../spotify/service";
import { Feature } from "../../pages/GeneratePlaylists/GeneratePlaylist";

interface AudioFeatureRadarChartProps {
    features: Array<Feature>;
    width?: number;
    height?: number;
    useLabels?: boolean;
}

function AudioFeatureRadarChart({
    features,
    width = 300,
    height = 200,
    useLabels = true,
}: AudioFeatureRadarChartProps) {
    let data = [];
    if (features) {
        for (let feature of features) {
            data.push({
                feature: feature.label,
                value: feature.value,
                max: 1,
            });
        }
    }

    console.log(features);

    let style = { width: width + "px", height: height + "px" };
    return (
        <div style={style}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    {useLabels == true ? (
                        <PolarAngleAxis dataKey="feature" />
                    ) : (
                        <></>
                    )}
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 1]}
                        tickCount={10}
                        tick={false}
                    />
                    <Radar
                        name="Features"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AudioFeatureRadarChart;
