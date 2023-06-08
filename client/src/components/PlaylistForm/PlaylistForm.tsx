import React, { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import "./PlaylistForm.css";
import AudioFeatureSelector from "../AudioFeatureRadarChart/AudioFeatureSelector";
import {
    generatePlaylist,
    getGenres,
    Min_Max_Target,
    TrackFeatures,
} from "../../spotify/service";

export interface Feature {
    label: string;
    value: number;
    setValue?: (value: number) => void;
}

function PlaylistForm() {
    const [acousticness, setAcousticness] = useState<number>(0.5);
    const [danceability, setDanceability] = useState<number>(0.5);
    const [energy, setEnergy] = useState<number>(0.5);
    const [instrumentalness, setInstramentalness] = useState<number>(0.5);
    const [liveness, setLiveness] = useState<number>(0.5);
    const [speechiness, setSpeechiness] = useState<number>(0.5);

    let features: TrackFeatures = {
        acousticness: acousticness,
        danceability: danceability,
        energy: energy,
        instrumentalness: instrumentalness,
        liveness: liveness,
        speechiness: speechiness,
    };

    let sliderFeatures: Array<Feature> = [
        {
            label: "acousticness",
            value: acousticness,
            setValue: setAcousticness,
        },
        {
            label: "danceability",
            value: danceability,
            setValue: setDanceability,
        },
        {
            label: "energy",
            value: energy,
            setValue: setEnergy,
        },
        {
            label: "instrumentalness",
            value: instrumentalness,
            setValue: setInstramentalness,
        },
        {
            label: "liveness",
            value: liveness,
            setValue: setLiveness,
        },
        {
            label: "speechiness",
            value: speechiness,
            setValue: setSpeechiness,
        },
    ];

    return <></>;
}

export default PlaylistForm;

/*

<form
    
>
    <input type="text" placeholder="Playlist Name" name="playlistName"></input>
    <input
        type="textarea"
        placeholder="Playlist Description"
        name="playlistDescription"
    />
    <input type="number" max={100} name="numTracks" />
    <select id="genres" name="genre">
        {genres?.map((genre, i) => (
            <option value={genre} key={i}>
                {genre}
            </option>
        ))}
    </select>
    <AudioFeatureSelector features={sliderFeatures} />
    <button type="submit">Generate</button>
</form>;

*/
