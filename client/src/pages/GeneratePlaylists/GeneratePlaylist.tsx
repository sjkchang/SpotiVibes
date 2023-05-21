import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import {
    generatePlaylist,
    getGenres,
    Min_Max_Target,
} from "../../spotify/service";
import "./GeneratePlaylist.css";
import AudioFeatureSlider from "../../components/Slider/AudioFeatureSlider";
import useLocalStorage from "../../hooks/useLocalStorage";
import SelectedSeeds from "../../components/SelectedSeeds/SelectedSeeds";

function GeneratePlaylist() {
    const [acousticness, setAcousticness, clearAcousticness] =
        useLocalStorage<Min_Max_Target>("acousticness", {
            min: 0,
            target: 0.5,
            max: 1,
        });
    const [danceability, setDanceability, clearDanceability] =
        useLocalStorage<Min_Max_Target>("danceability", { target: 0.5 });
    const [energy, setEnergy, clearEnergy] = useLocalStorage<Min_Max_Target>(
        "energy",
        { target: 0.5 }
    );
    const [instrumentalness, setInstrumentalness, clearInstrumentalness] =
        useLocalStorage<Min_Max_Target>("instrumentalness", { target: 0.5 });
    const [liveness, setLiveness, clearLiveness] =
        useLocalStorage<Min_Max_Target>("liveness", { target: 0.5 });
    const [popularity, setPopularity, clearPopularity] =
        useLocalStorage<Min_Max_Target>("popularity", { target: 50 });
    const [speechiness, setSpeechiness, clearSpeechiness] =
        useLocalStorage<Min_Max_Target>("speechiness", { target: 0.5 });

    const [valence, setValence, clearValence] = useLocalStorage<Min_Max_Target>(
        "valence",
        { target: 0.5 }
    );
    const [loudness, setLoudness, clearLoudness] =
        useLocalStorage<Min_Max_Target>("loudness", { target: 0.5 });

    const [genres, setGenres, clearGenres] = useLocalStorage<Array<string>>(
        "genres",
        []
    );

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
                track_features: {
                    acousticness: acousticness,
                    danceability: danceability,
                    energy: energy,
                    instrumentalness: instrumentalness,
                    liveness: liveness,
                    popularity: popularity,
                    speechiness: speechiness,
                    valence: valence,
                    loudness: loudness,
                },
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
        <div>
            <form
                onSubmit={(event: any) => {
                    event.preventDefault();
                    let playlistName = event.target.playlistName.value;
                    let playlistDescription =
                        event.target.playlistDescription.value;
                    let numTracks = event.target.numTracks.value;
                    let genre = event.target.genre.value;
                    getRecommendations(
                        playlistName,
                        playlistDescription,
                        genre,
                        numTracks
                    );
                }}
            >
                <SelectedSeeds />
                <input
                    type="text"
                    placeholder="Playlist Name"
                    name="playlistName"
                ></input>
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
                <div>
                    <AudioFeatureSlider
                        label="acousticness"
                        max={1}
                        value={acousticness}
                        setFeature={setAcousticness}
                    />
                    <AudioFeatureSlider
                        label="danceability"
                        max={1}
                        value={danceability}
                        setFeature={setDanceability}
                    />
                    <AudioFeatureSlider
                        label="energy"
                        max={1}
                        value={energy}
                        setFeature={setEnergy}
                    />
                    <AudioFeatureSlider
                        label="instrumentalness"
                        max={1}
                        value={instrumentalness}
                        setFeature={setInstrumentalness}
                    />
                    <AudioFeatureSlider
                        label="liveness"
                        max={1}
                        value={liveness}
                        setFeature={setLiveness}
                    />
                    <AudioFeatureSlider
                        label="popularity"
                        max={100}
                        step={1}
                        value={popularity}
                        setFeature={setPopularity}
                    />
                    <AudioFeatureSlider
                        label="speechiness"
                        max={1}
                        value={speechiness}
                        setFeature={setSpeechiness}
                    />
                    <AudioFeatureSlider
                        label="valence"
                        max={1}
                        value={valence}
                        setFeature={setValence}
                    />
                    <AudioFeatureSlider
                        label="loudness"
                        max={1}
                        value={loudness}
                        setFeature={setLoudness}
                    />
                </div>

                <button type="submit">Generate</button>
            </form>
        </div>
    );
}

export default GeneratePlaylist;
