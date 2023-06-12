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
import Slider from "../../components/Slider/Slider";
import AudioFeatureRadarChart from "./AudioFeatureRadarChart";
import { Feature } from "../../pages/GeneratePlaylists/GeneratePlaylist";
import "./AudioFeatureRadarChart.css";

interface AudioFeatureSelectorProps {
    features: Array<Feature>;
}

function AudioFeatureSelector({ features }: AudioFeatureSelectorProps) {
    return (
        <div className="FeatureSelector">
            <div className="FeatureSliders">
                {features.map((feature) => {
                    return (
                        <div>
                            <label>{feature.label}</label>
                            <Slider
                                defaultValue={
                                    feature.value ? [feature.value] : []
                                }
                                min={0}
                                max={1}
                                step={0.05}
                                onValueChange={(value) => {
                                    feature.setValue?.(value[0]);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="FeatureChart">
                <AudioFeatureRadarChart features={features} />
            </div>
        </div>
    );
}

export default AudioFeatureSelector;
