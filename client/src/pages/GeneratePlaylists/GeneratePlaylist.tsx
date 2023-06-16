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
import AudioFeatureSelector from "../../components/AudioFeatureRadarChart/AudioFeatureSelector";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { Button, theme } from "../../styles";
const { colors } = theme;
const StyledForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
`;

const FormErrorMessage = styled(Form.Message)`
    font-size: 13px;
    color: red;
    opacity: 0.8;
`;

const FormLabel = styled(Form.Label)`
    font-size: 15px;
    font-weight: 500;
    line-height: 35px;
    color: ${colors.primary};
`;

const FormField = styled(Form.Field)`
    display: grid;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 0 10px;
    height: 35px;
    line-height: 1;

    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    font-size: 15px;
    color: white;
    background-color: ${colors.background};
    box-shadow: 0 0 0 1px ${colors.secondary};
    &:hover {
        box-shadow: 0 0 0 1px ${colors.primary};
    }
    &:focus {
        box-shadow: 0 0 0 2px ${colors.primary};
    }
    &:selection {
        background-color: var(red);
        color: white;
    }
`;

const Textarea = styled.textarea`
    resize: none;
    padding: 10px;

    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    font-size: 15px;
    color: white;
    background-color: ${colors.background};
    box-shadow: 0 0 0 1px ${colors.secondary};
    &:hover {
        box-shadow: 0 0 0 1px ${colors.primary};
    }
    &:focus {
        box-shadow: 0 0 0 2px ${colors.primary};
    }
    &:selection {
        background-color: var(red);
        color: white;
    }
`;

const Select = styled.select`
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    font-size: 15px;
    color: white;
    background-color: ${colors.background};
    box-shadow: 0 0 0 1px ${colors.secondary};
    &:hover {
        box-shadow: 0 0 0 1px ${colors.primary};
    }
    &:focus {
        box-shadow: 0 0 0 2px ${colors.primary};
    }
    &:selection {
        background-color: var(red);
        color: white;
    }
`;

export interface Feature {
    label: string;
    value: number;
    max: number;
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
            max: 1,
            setValue: setSpeechiness,
        },
        {
            label: "acoustic",
            value: acousticness,
            max: 1,
            setValue: setAcousticness,
        },
        {
            label: "danceable",
            value: danceability,
            max: 1,
            setValue: setDanceability,
        },
        {
            label: "instrumental",
            value: instrumentalness,
            max: 1,
            setValue: setInstramentalness,
        },
        {
            label: "energy",
            value: energy,
            max: 1,
            setValue: setEnergy,
        },

        {
            label: "liveness",
            value: liveness,
            max: 1,
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
        if (!genres) {
            getGenres().then((response) => {
                setGenres(response);
            });
        }
    }, []);

    return (
        <div>
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
            >
                <StyledForm>
                    <div className="NewPlaylistInfo">
                        <FormField name="playlistName">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                }}
                            >
                                <FormLabel>Name</FormLabel>
                                <FormErrorMessage match="valueMissing">
                                    Please enter your email
                                </FormErrorMessage>
                            </div>
                            <Form.Control asChild>
                                <Input type="text" required />
                            </Form.Control>
                        </FormField>
                        <FormField name="description">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "space-between",
                                }}
                            >
                                <FormLabel>Description</FormLabel>
                                <FormErrorMessage match="valueMissing">
                                    Please enter a playlist description
                                </FormErrorMessage>
                            </div>
                            <Form.Control asChild>
                                <Textarea required />
                            </Form.Control>
                        </FormField>
                        <div className="PlaylistData">
                            <FormField name="genres">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <FormLabel>Genre</FormLabel>
                                    <Form.Message
                                        className="FormMessage"
                                        match="valueMissing"
                                    >
                                        Please select a genre
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <Select id="genres" name="genre" required>
                                        {genres?.map((genre, i) => (
                                            <option value={genre} key={i}>
                                                {genre}
                                            </option>
                                        ))}
                                    </Select>
                                </Form.Control>
                            </FormField>
                            <FormField name="numTracks">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <FormLabel># Tracks</FormLabel>
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
                                    <Input
                                        type="number"
                                        max={100}
                                        min={1}
                                        defaultValue={20}
                                        name="numTracks"
                                    />
                                </Form.Control>
                            </FormField>
                        </div>
                    </div>
                    <div className="FeatureSelector">
                        <AudioFeatureSelector
                            features={sliderFeatures}
                        ></AudioFeatureSelector>
                        <Form.Submit asChild>
                            <Button style={{ float: "right" }}>Generate</Button>
                        </Form.Submit>
                    </div>
                </StyledForm>
            </Form.Root>
        </div>
    );
}

export default GeneratePlaylist;
