import React, { useEffect, useState } from "react";

import SpotifyTypes from "spotify-types";
import { TrackFeatures, getTrackFeatures } from "../../spotify/service";
import { Feature } from "../../pages/GeneratePlaylists/GeneratePlaylist";
import { theme } from "../../styles";
import RadarChart, { DataPoint } from "./RadarChart";
import { isTrack } from "../../spotify/types";
const { colors } = theme;

interface AudioFeatureRadarChartProps {
    item?: SpotifyTypes.Track;
    data?: Array<Feature> | Array<DataPoint>;
    useLabels?: boolean;
}

function AudioFeatureRadarChart({
    item,
    data,
    useLabels = true,
}: AudioFeatureRadarChartProps) {
    const [features, setFeatures] = useState<Array<DataPoint>>();

    useEffect(() => {
        if (item) {
            getTrackFeatures(item.id)
                .then((result) => {
                    data = [
                        {
                            label: "speechiness",
                            value: result.speechiness,
                            max: 1,
                        },
                        {
                            label: "acoustic",
                            value: result.acousticness,
                            max: 1,
                        },
                        {
                            label: "danceable",
                            value: result.danceability,
                            max: 1,
                        },
                        {
                            label: "instrumentalness",
                            value: result.instrumentalness,
                            max: 1,
                        },
                        {
                            label: "energy",
                            value: result.energy,
                            max: 1,
                        },
                        {
                            label: "liveness",
                            value: result.liveness,
                            max: 1,
                        },
                    ];
                    setFeatures(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (data) return <RadarChart data={data} />;
    if (features) return <RadarChart data={features} />;
    return <>Loading</>;
}

export default AudioFeatureRadarChart;
