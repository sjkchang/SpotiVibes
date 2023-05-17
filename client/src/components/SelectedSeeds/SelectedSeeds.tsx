import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import { Track, Artist } from "spotify-types";
import { getTracks, getArtists } from "../../spotify/service";
import ComponentList from "../ComponentList/ComponentList";
import ArtistItem from "../ArtistItem/ArtistItem";
import TrackItem from "../TrackItem/TrackItem";
import "./SelectedSeeds.css";

function SelectedSeeds() {
    const seeds = useAppSelector((state: any) => state.seeds);
    const [tracks, setTracks] = useState<Array<Track>>([]);
    const [artists, setArtists] = useState<Array<Artist>>([]);
    const [genres, setGenres] = useState<Array<string>>([]);

    useEffect(() => {
        console.log(seeds);
        let trackUris: Array<string> = [];
        let artistUris: Array<string> = [];
        let genres: Array<string> = [];
        for (let seed of seeds.uris) {
            let components = seed.split(":");
            if (components.length === 1) {
                genres.push(components[0]);
            } else {
                if (components[1] == "track") {
                    trackUris.push(components[2]);
                }
                if (components[1] == "artist") {
                    artistUris.push(components[2]);
                }
            }
        }

        fetchTracks(trackUris).then((tracks) => {
            console.log("Seed Tracks: " + tracks.toString());
            setTracks(tracks);
        });
        fetchArtists(artistUris).then((artists) => {
            console.log("Seed Artists: " + artists.toString());
            setArtists(artists);
        });
    }, [seeds, genres]);

    let fetchTracks = async (uris: Array<string>): Promise<Array<Track>> => {
        if (uris.length > 0) {
            let response = await getTracks(uris);
            console.log(response);
            return response;
        }
        return [];
    };

    let fetchArtists = async (uris: Array<string>) => {
        if (uris.length > 0) {
            let response = await getArtists(uris);
            return response;
        }
        return [];
    };

    return (
        <div className="SelectedSeeds">
            <div>Selected Seeds</div>
            <ComponentList className="top-item-children" items={artists}>
                <ArtistItem />
            </ComponentList>
            <ComponentList className="top-item-children" items={tracks}>
                <TrackItem />
            </ComponentList>
        </div>
    );
}

export default SelectedSeeds;
