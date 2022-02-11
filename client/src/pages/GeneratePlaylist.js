import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import GenreBox from "../components/GenreBox/GenreBox";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";

export const GeneratePlaylist = () => {
    const [tracks, setTracks] = useState([]);
    const [trackTitles, setTrackTitles] = useState([]);
    const [accousticness, setAccousticness] = useState([0, 0.5, 1]);
    const [tempo, setTempo] = useState([0, 140, 600]);
    const [danceabliity, setDanceabliity] = useState([0, 0.5, 1]);
    const [instramemtalness, setInstramemtalness] = useState([0, 0.5, 1]);
    const [speechLevel, setSpeechLevel] = useState([0, 0.5, 1]);

    useEffect(() => {
        const cookies = new Cookies();
        const seedTracks = cookies.get("selected_seed_tracks") || [];
        const seedTrackTitles = cookies.get("selected_seed_track_titles") || [];

        setTracks(seedTracks);
        setTrackTitles(seedTrackTitles);
    }, []);

    return (
        <div className='GeneratePlaylist'>
            <div>
                <GenreBox />
                <p>Selected Tracks:</p>
                <ol>
                    {trackTitles.map((title, index) => {
                        return <li>{title}</li>;
                    })}
                </ol>
                <strong>Accousticness: </strong>
                <p>min-accousticness: {accousticness[0]}</p>
                <p>target-accousticness: {accousticness[1]}</p>
                <p>max-accousticness: {accousticness[2]}</p>
                <Range
                    min={0}
                    max={1}
                    defaultValue={accousticness}
                    step={0.05}
                    count={2}
                    allowCross={false}
                    onAfterChange={(value) => {
                        setAccousticness(value);
                    }}
                />
                <strong>Tempo: </strong>
                <p>min-tempo: {tempo[0]}</p>
                <p>target-tempo: {tempo[1]}</p>
                <p>max-tempo: {tempo[2]}</p>
                <Range
                    min={0}
                    max={600}
                    defaultValue={tempo}
                    step={1}
                    count={2}
                    allowCross={false}
                    onAfterChange={(value) => {
                        setTempo(value);
                    }}
                />
                <strong>Danceabliity: </strong>
                <p>min-danceabliity: {danceabliity[0]}</p>
                <p>target-danceabliity: {danceabliity[1]}</p>
                <p>max-danceabliity: {danceabliity[2]}</p>
                <Range
                    min={0}
                    max={1}
                    defaultValue={danceabliity}
                    step={0.05}
                    count={2}
                    allowCross={false}
                    onAfterChange={(value) => {
                        setDanceabliity(value);
                    }}
                />

                <strong>Instramemtalness: </strong>
                <p>min-instramemtalness: {instramemtalness[0]}</p>
                <p>target-instramemtalness: {instramemtalness[1]}</p>
                <p>max-instramemtalness: {instramemtalness[2]}</p>
                <Range
                    min={0}
                    max={1}
                    defaultValue={instramemtalness}
                    step={0.05}
                    count={2}
                    allowCross={false}
                    onAfterChange={(value) => {
                        setInstramemtalness(value);
                    }}
                />

                <strong>Speech Level: </strong>
                <p>min-speechLevel: {speechLevel[0]}</p>
                <p>target-speechLevel: {speechLevel[1]}</p>
                <p>max-speechLevel: {speechLevel[2]}</p>
                <Range
                    min={0}
                    max={1}
                    defaultValue={speechLevel}
                    step={0.05}
                    count={2}
                    allowCross={false}
                    onAfterChange={(value) => {
                        setSpeechLevel(value);
                    }}
                />

                <button
                    onClick={async () => {
                        let res = await axios.get(
                            "api/spotify/recommendations",
                            {
                                seed_tracks: tracks,

                                min_accousticness: accousticness[0],
                                target_accousticness: accousticness[1],
                                max_accousticness: accousticness[2],

                                min_tempo: tempo[0],
                                target_tempo: tempo[1],
                                max_tempo: tempo[2],

                                min_danceability: danceabliity[0],
                                target_danceability: danceabliity[1],
                                max_danceability: danceabliity[2],
                            }
                        );
                        console.log(res);
                    }}
                ></button>
            </div>
        </div>
    );
};

export default GeneratePlaylist;
