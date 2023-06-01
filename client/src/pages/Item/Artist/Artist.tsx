import React, { useEffect, useState } from "react";
import SpotifyTypes from "spotify-types";
import { getArtist } from "../../../spotify/service";
import { useParams } from "react-router-dom";

import {
    SpotifyTypesEnum,
    TimeRangeEnum,
    TopItemsQuery,
} from "../../../spotify/types";
import BrickList from "../../../components/BrickList/BrickList";
import "./Artist.css";
function Artist() {
    const [artist, setArtist] = useState<SpotifyTypes.Artist>();
    const [artistTopTracks, setArtistTopTracks] =
        useState<Array<SpotifyTypes.Track>>();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        if (id) {
            getArtist(id)
                .then((result) => {
                    setArtist(result[0]);

                    setArtistTopTracks(result[1]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (artist && artistTopTracks) {
        let image =
            artist.images.length > 0
                ? artist.images[0].url
                : "https://freeimage.host/i/album-cover-placeholder.HlHy9Yx";
        return (
            <div className="ArtistPage">
                <div className="ArtistInfo">
                    <div className="ArtistImage">
                        <img className="Image rounded" src={image} />
                    </div>
                    <div className="ArtistName">{artist.name}</div>
                    <div className="ArtistDescription">
                        {artist.followers.total.toLocaleString()} Followers
                    </div>
                    <div className="ArtistPopularity">
                        Popularity: {artist.popularity}%
                    </div>
                </div>
                <div className="PopularTracks">
                    <div className="TopTracksHeader">Popular</div>
                    <BrickList items={artistTopTracks}></BrickList>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h3>Tracks</h3>
            Loading
        </div>
    );
}

export default Artist;
