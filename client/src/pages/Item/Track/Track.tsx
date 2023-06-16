import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTrack, getTrackFeatures } from "../../../spotify/service";
import { useParams } from "react-router-dom";
import "./Track.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleSeeds } from "../../../redux/slices/seedsSlice";
import AudioFeatureRadarChart from "../../../components/AudioFeatureRadarChart/AudioFeatureRadarChart";
import { Feature } from "../../GeneratePlaylists/GeneratePlaylist";

function Track() {
    const [track, setTrack] = useState<SpotifyTypes.Track>();
    const [features, setFeatures] = useState<SpotifyTypes.AudioFeatures>();

    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let { id } = useParams();

    let sliderFeatures: Array<Feature> = [];
    if (features) {
        sliderFeatures = [
            {
                label: "speechiness",
                value: features.speechiness,
                max: 1,
            },
            {
                label: "acoustic",
                value: features.acousticness,
                max: 1,
            },
            {
                label: "danceable",
                value: features.danceability,
                max: 1,
            },
            {
                label: "instrumentalness",
                value: features.instrumentalness,
                max: 1,
            },
            {
                label: "energy",
                value: features.energy,
                max: 1,
            },
            {
                label: "liveness",
                value: features.liveness,
                max: 1,
            },
        ];
    }

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
                    <AudioFeatureRadarChart data={sliderFeatures} />
                </div>
            </div>
        );
    }

    return <div>Loading</div>;
}

export default Track;
