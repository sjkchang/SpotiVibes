import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import {
    generatePlaylist,
    getGenres,
    Min_Max_Target,
    TrackFeatures,
} from "../../spotify/service";
import "./GeneratePlaylist.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import SelectedSeeds from "../../components/SelectedSeeds/SelectedSeeds";
import AudioFeatureRadarChart from "../../components/AudioFeatureRadarChart/AudioFeatureRadarChart";
import AudioFeatureSelector from "../../components/AudioFeatureRadarChart/AudioFeatureSelector";
import * as Form from "@radix-ui/react-form";

export interface Feature {
    label: string;
    value: number;
    setValue?: (value: number) => void;
}

function GeneratePlaylist() {
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
            label: "speechiness",
            value: speechiness,
            setValue: setSpeechiness,
        },
        {
            label: "acoustic",
            value: acousticness,
            setValue: setAcousticness,
        },
        {
            label: "danceable",
            value: danceability,
            setValue: setDanceability,
        },
        {
            label: "instrumental",
            value: instrumentalness,
            setValue: setInstramentalness,
        },
        {
            label: "energy",
            value: energy,
            setValue: setEnergy,
        },

        {
            label: "liveness",
            value: liveness,
            setValue: setLiveness,
        },
    ];

    const [genres, setGenres, clearGenres] =
        useLocalStorage<Array<string>>("genres");

    const seeds = useAppSelector((state: any) => state.seeds);

    let getRecommendations = (
        playlistName: string,
        playlistDescription: string,
        genre: string,
        limit: number
    ) => {
        let trackUris: Array<string> = [];
        let artistUris: Array<string> = [];
        if (seeds.uris.length > 0) {
            for (let seed of seeds.uris) {
                let uri_components = seed.split(":");
                if (uri_components.length === 3) {
                    if (uri_components[1] === "track") {
                        trackUris.push(uri_components[2]);
                    }
                    if (uri_components[1] === "artist") {
                        artistUris.push(uri_components[2]);
                    }
                }
            }

            generatePlaylist({
                playlistName: playlistName,
                playlistDescription: playlistDescription,
                seed_artists: artistUris,
                seed_tracks: trackUris,
                seed_genres: [genre],
                limit: limit,
                track_features: features,
            }).then((response) => {
                console.log(response);
            });
        } else {
            console.log("No seeds");
        }
    };

    useEffect(() => {
        getGenres().then((response) => {
            setGenres(response);
        });
    }, []);

    return (
        <div style={{ margin: "auto" }}>
            <h1>Generate Playlist</h1>
            <Form.Root
                onSubmit={(event: any) => {
                    event.preventDefault();
                    let playlistName = event.target.playlistName.value;
                    let playlistDescription = event.target.description.value;
                    let numTracks = event.target.numTracks.value;
                    let genre = event.target.genre.value;
                    getRecommendations(
                        playlistName,
                        playlistDescription,
                        genre,
                        numTracks
                    );
                }}
                className="FormRoot"
            >
                <div className="Form">
                    <div className="NewPlaylistInfo">
                        <Form.Field className="FormField" name="playlistName">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Form.Label className="FormLabel">
                                    Name
                                </Form.Label>
                                <Form.Message
                                    className="FormMessage"
                                    match="valueMissing"
                                >
                                    Please enter your email
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input className="Input" type="text" required />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField" name="description">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Form.Label className="FormLabel">
                                    Description
                                </Form.Label>
                                <Form.Message
                                    className="FormMessage"
                                    match="valueMissing"
                                >
                                    Please enter a playlist description
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <textarea className="Textarea" required />
                            </Form.Control>
                        </Form.Field>
                        <div className="PlaylistData">
                            <Form.Field className="FormField" name="genres">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Form.Label className="FormLabel">
                                        Genre
                                    </Form.Label>
                                    <Form.Message
                                        className="FormMessage"
                                        match="valueMissing"
                                    >
                                        Please select a genre
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <select
                                        id="genres"
                                        name="genre"
                                        className="Input"
                                        required
                                    >
                                        {genres?.map((genre, i) => (
                                            <option value={genre} key={i}>
                                                {genre}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field className="FormField" name="numTracks">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Form.Label className="FormLabel">
                                        # Tracks
                                    </Form.Label>
                                    <Form.Message
                                        className="FormMessage"
                                        match="rangeOverflow"
                                    >
                                        "Range: 1-100"
                                    </Form.Message>
                                    <Form.Message
                                        className="FormMessage"
                                        match={"rangeUnderflow"}
                                    >
                                        "Range: 1-100"
                                    </Form.Message>
                                    <Form.Message
                                        className="FormMessage"
                                        match="valueMissing"
                                    />
                                </div>
                                <Form.Control asChild>
                                    <input
                                        type="number"
                                        max={100}
                                        min={1}
                                        defaultValue={20}
                                        name="numTracks"
                                        className="Input"
                                    />
                                </Form.Control>
                            </Form.Field>
                        </div>
                    </div>
                    <div className="FeatureSelector">
                        <AudioFeatureSelector
                            features={sliderFeatures}
                        ></AudioFeatureSelector>
                    </div>
                </div>
                <Form.Submit asChild>
                    <button className="Button" style={{ marginTop: 10 }}>
                        Generate
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    );
}

export default GeneratePlaylist;
