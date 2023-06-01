import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTrack, getTrackFeatures } from "../../../spotify/service";
import { useParams } from "react-router-dom";
import "./Track.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

function Track() {
    const [track, setTrack] = useState<SpotifyTypes.Track>();
    const [features, setFeatures] = useState<SpotifyTypes.AudioFeatures>();

    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getTrack(id)
                .then((result) => {
                    setTrack(result);
                })
                .catch((error) => {
                    console.log(error);
                });
            getTrackFeatures(id)
                .then((result) => {
                    setFeatures(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    if (track) {
        console.log(track);

        let image =
            track.album.images.length > 0
                ? track.album.images[0].url
                : "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";

        let data;
        if (features) {
            data = [
                {
                    feature: "Acousticness",
                    a: features.acousticness,
                    max: 1,
                },
                {
                    feature: "Danceability",
                    a: features.danceability,
                    max: 1,
                },
                {
                    feature: "Energy",
                    a: features.energy,
                    max: 1,
                },
                {
                    feature: "Instrumentalness",
                    a: features.instrumentalness,
                    max: 1,
                },
                {
                    feature: "Liveness",
                    a: features.liveness,
                    max: 1,
                },
                {
                    feature: "Speechiness",
                    a: features.speechiness,
                    max: 1,
                },
            ];
        } else {
            data = [
                {
                    feature: "Acousticness",
                    a: 0,
                    max: 1,
                },
                {
                    feature: "Danceability",
                    a: 0,
                    max: 1,
                },
                {
                    feature: "Energy",
                    a: 0,
                    max: 1,
                },
                {
                    feature: "Instrumentalness",
                    a: 0,
                    max: 1,
                },
                {
                    feature: "Liveness",
                    a: 0,
                    max: 1,
                },
                {
                    feature: "Speechiness",
                    a: 0,
                    max: 1,
                },
            ];
        }

        return (
            <div className="Track">
                <div className="TrackHeader">
                    <div className="TrackImage">
                        <img className="Image" src={image}></img>
                    </div>
                    <div className="TrackInfo">
                        <div className="TrackTitle">{track.name}</div>
                        <div className="TrackArtist">
                            <a href={"/artist/" + track.artists[0].id}>
                                {track.artists[0].name}
                            </a>
                        </div>
                        <div className="TrackAlbum">
                            <a href={"/album/" + track.album.id}>
                                {track.album.name}
                            </a>
                        </div>
                        <div
                            className="AddSeedBtn"
                            onClick={(e) => {
                                dispatch(toggleSeeds(track.uri));
                                if (e && e.stopPropagation) e.stopPropagation();
                            }}
                        >
                            {seeds.uris.includes(track.uri)
                                ? "Remove Seed"
                                : "Add Seed"}
                        </div>
                    </div>
                </div>
                <div className="TrackData">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            data={data}
                        >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="feature" />
                            <Radar
                                name="Track"
                                dataKey="a"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    return <div>Loading</div>;
}

export default Track;
