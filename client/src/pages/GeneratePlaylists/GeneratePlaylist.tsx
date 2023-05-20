import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import {
    generatePlaylist,
    getGenres,
    Min_Max_Target,
} from "../../spotify/service";
import "./GeneratePlaylist.css";
import Slider from "../../components/Slider/Slider";
import AudioFeatureSlider from "../../components/Slider/AudioFeatureSlider";

function useLocalStorage<Type>(
    key: string,
    initialValue: Type | undefined = undefined
) {
    return useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
}

function onChangeLocalSave<Type>(
    key: string,
    value: Type,
    setValue: (value: Type) => void
) {
    window.localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
}

function GeneratePlaylist() {
    const [acousticness, setAcousticness] = useLocalStorage<Min_Max_Target>(
        "acousticness",
        { target: 0.5 }
    );
    const [danceability, setDanceability] = useLocalStorage<Min_Max_Target>(
        "danceability",
        { target: 0.5 }
    );
    const [energy, setEnergy] = useLocalStorage<Min_Max_Target>("energy", {
        target: 0.5,
    });
    const [instrumentalness, setInstrumentalness] =
        useLocalStorage<Min_Max_Target>("instrumentalness", { target: 0.5 });
    const [liveness, setLiveness] = useLocalStorage<Min_Max_Target>(
        "liveness",
        { target: 0.5 }
    );
    const [popularity, setPopularity] = useLocalStorage<Min_Max_Target>(
        "popularity",
        { target: 50 }
    );
    const [speechiness, setSpeechiness] = useLocalStorage<Min_Max_Target>(
        "speechiness",
        { target: 0.5 }
    );
    const [tempo, setTempo] = useLocalStorage<Min_Max_Target>("tempo", {
        target: 140,
    });
    const [valence, setValence] = useLocalStorage<Min_Max_Target>("valence", {
        target: 0.5,
    });
    const [loudness, setLoudness] = useLocalStorage<Min_Max_Target>(
        "loudness",
        { target: 0.5 }
    );

    const [numTracks, setNumTracks] = useState<number>(20);
    const [genres, setGenres] = useState<Array<string>>([]);
    const [genre, setGenre] = useState<string>("");

    const seeds = useAppSelector((state: any) => state.seeds);
    const dispatch = useAppDispatch();

    let trackUris;
    let artistUris;

    let getRecommendations = () => {
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
                seed_artists: artistUris,
                seed_tracks: trackUris,
                seed_genres: [genre],
                limit: numTracks,
                track_features: {
                    acousticness: acousticness,
                    danceability: danceability,
                    energy: energy,
                    instrumentalness: instrumentalness,
                    liveness: liveness,
                    popularity: popularity,
                    speechiness: speechiness,
                    tempo: tempo,
                    valence: valence,
                    loudness: loudness,
                },
            }).then((response) => {
                console.log(response);
            });
        }
    };

    useEffect(() => {
        console.log(acousticness);
        getGenres().then((response) => {
            setGenres(response);
        });
    }, []);

    return (
        <div>
            <input type="text" placeholder="Playlist Name"></input>
            <input type="textarea" placeholder="Playlist Description" />
            <input
                type="number"
                value={numTracks}
                max={100}
                onChange={(e) => setNumTracks(parseInt(e.target.value))}
            />
            <select
                id="genres"
                name="genres"
                onChange={(event) => {
                    setGenre(event.target.value);
                }}
            >
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
                    min={0}
                    value={acousticness}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setAcousticness);
                    }}
                />
                <AudioFeatureSlider
                    label="danceability"
                    max={1}
                    min={0}
                    value={danceability}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setDanceability);
                    }}
                />
                <AudioFeatureSlider
                    label="energy"
                    max={1}
                    min={0}
                    value={energy}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setEnergy);
                    }}
                />
                <AudioFeatureSlider
                    label="instrumentalness"
                    max={1}
                    min={0}
                    value={instrumentalness}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setInstrumentalness);
                    }}
                />
                <AudioFeatureSlider
                    label="liveness"
                    max={1}
                    min={0}
                    value={liveness}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setLiveness);
                    }}
                />
                <AudioFeatureSlider
                    label="popularity"
                    max={100}
                    min={0}
                    step={1}
                    value={popularity}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setPopularity);
                    }}
                />
                <AudioFeatureSlider
                    label="speechiness"
                    max={1}
                    min={0}
                    value={speechiness}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setSpeechiness);
                    }}
                />
                <AudioFeatureSlider
                    label="valence"
                    max={1}
                    min={0}
                    value={valence}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setValence);
                    }}
                />
                <AudioFeatureSlider
                    label="loudness"
                    max={1}
                    min={0}
                    value={loudness}
                    setFeature={(key, value) => {
                        onChangeLocalSave(key, value, setLoudness);
                    }}
                />
            </div>

            <button onClick={() => getRecommendations()}>Generate</button>
        </div>
    );
}

export default GeneratePlaylist;
