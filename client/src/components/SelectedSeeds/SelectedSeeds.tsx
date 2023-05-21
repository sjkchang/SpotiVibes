import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getTracks, getArtists } from "../../spotify/service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import CardGrid from "../CardGrid/CardGrid";
import BrickList from "../BrickList/BrickList";

interface SelectedSeedsProps extends React.HTMLAttributes<any> {}

function SelectedSeeds({}: SelectedSeedsProps) {
    const [artists, setArtists] = useState<Array<SpotifyTypes.Artist>>([]);
    const [tracks, setTracks] = useState<Array<SpotifyTypes.Track>>([]);

    const seeds = useAppSelector((state: any) => state.seeds);

    useEffect(() => {
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
        }
        getTracks(trackUris)
            .then((tracks) => {
                setTracks(tracks);
            })
            .catch((error) => {
                console.log(error);
            });

        getArtists(artistUris)
            .then((artists) => {
                setArtists(artists);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [seeds]);

    return (
        <div>
            <div className="top-header">
                <div>
                    Seeds Tracks
                    <BrickList items={tracks} />
                </div>
                <div>
                    Seed Artists
                    <CardGrid items={artists} />
                </div>
            </div>
        </div>
    );
}

export default SelectedSeeds;
