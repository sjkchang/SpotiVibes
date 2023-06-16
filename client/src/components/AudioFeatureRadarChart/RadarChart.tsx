import React, { useEffect, useState } from "react";
import {
    Radar,
    RadarChart as RechartRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import SpotifyTypes from "spotify-types";
import { TrackFeatures } from "../../spotify/service";
import { Feature } from "../../pages/GeneratePlaylists/GeneratePlaylist";
import { theme } from "../../styles";
const { colors } = theme;

export interface DataPoint {
    label: string;
    value: number;
    max: number;
}

interface AudioFeatureRadarChartProps {
    data: Array<DataPoint>;
    useLabels?: boolean;
}

function RadarChart({ data, useLabels = true }: AudioFeatureRadarChartProps) {
    return (
        <ResponsiveContainer width="99%" aspect={1.5}>
            <RechartRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                {useLabels == true ? <PolarAngleAxis dataKey="label" /> : <></>}
                <PolarRadiusAxis
                    angle={90}
                    domain={[0, 1]}
                    tickCount={10}
                    tick={false}
                />
                <Radar
                    name="Features"
                    dataKey="value"
                    stroke={colors.spotifyGreen}
                    fill={colors.spotifyGreen}
                    fillOpacity={0.6}
                />
            </RechartRadarChart>
        </ResponsiveContainer>
    );
}

export default RadarChart;
