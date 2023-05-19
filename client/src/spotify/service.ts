import axios from "axios";
import { authService } from "./AuthService";
import { Artist, Track, Playlist } from "spotify-types";
import { TopItemsQuery, TopTracksResponse, TopArtistsResponse } from "./types";
import { platform } from "os";
import { PlayIcon } from "@radix-ui/react-icons";

export async function getProfile() {
    let accessToken = authService.getToken();
    return fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    }).then((response) => {
        return response.json();
    });
}

export async function getTopTracks(
    query: TopItemsQuery
): Promise<Array<Track>> {
    let accessToken = authService.getToken();

    return await axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            params: {
                time_range: query.time_range,
                limit: query.limit.toString(),
                offset: query.offset.toString(),
            },
        })
        .then(({ data }: { data: TopTracksResponse }) => {
            console.log("Data: ");
            console.log(data.items);
            return data.items;
        });
}

export async function getTopArtists(
    query: TopItemsQuery
): Promise<Array<Artist>> {
    let accessToken = authService.getToken();

    let items: Array<Artist> = await axios
        .get("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            params: {
                time_range: query.time_range,
                limit: query.limit.toString(),
                offset: query.offset.toString(),
            },
        })
        .then(({ data }: { data: TopArtistsResponse }) => {
            return data.items;
        });
    return items;
}

export async function getTracks(uris: Array<string>): Promise<Array<Track>> {
    let accessToken = authService.getToken();

    let items: Array<Track> = await axios
        .get("https://api.spotify.com/v1/tracks", {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            params: {
                ids: uris.toString(),
            },
        })
        .then(({ data }: { data: any }) => {
            return data.tracks;
        });

    return items;
}

export async function getArtists(uris: Array<string>): Promise<Array<Artist>> {
    let accessToken = authService.getToken();

    let items: Array<Artist> = await axios
        .get("https://api.spotify.com/v1/artists", {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            params: {
                ids: uris.toString(),
            },
        })
        .then(({ data }: { data: any }) => {
            return data.artists;
        });

    return items;
}

export async function getPlaylists(limit = 20, offset = 0) {
    if (limit < 0 || limit > 50) throw Error("Invalid Limit:" + limit);
    if (offset < 0 || offset > 100_000) throw Error("Invalid Limit:" + limit);

    let args = new URLSearchParams();

    let items: Array<Playlist> = await axios
        .get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: "Bearer " + authService.getToken(),
            },
            params: {
                limit: limit,
                offset: offset,
            },
        })
        .then(({ data }: { data: any }) => {
            return data.items;
        });

    return items;
}

export async function getPlaylist(playlistId: string) {
    let [playlist, tracks] = await Promise.all([
        axios
            .get("https://api.spotify.com/v1/playlists/" + playlistId, {
                headers: {
                    Authorization: "Bearer " + authService.getToken(),
                },
            })
            .then(({ data }: { data: Playlist }) => {
                return data;
            }),
        axios
            .get(
                "https://api.spotify.com/v1/playlists/" +
                    playlistId +
                    "/tracks",
                {
                    headers: {
                        Authorization: "Bearer " + authService.getToken(),
                    },
                }
            )
            .then(({ data }: { data: any }) => {
                return data.items;
            }),
    ]);

    return [playlist, tracks];
}

export async function getArtist(artistId: string) {
    let [playlist, tracks] = await Promise.all([
        axios
            .get("https://api.spotify.com/v1/artists/" + artistId, {
                headers: {
                    Authorization: "Bearer " + authService.getToken(),
                },
            })
            .then(({ data }: { data: Artist }) => {
                return data;
            }),
        axios
            .get(
                "https://api.spotify.com/v1/artists/" +
                    artistId +
                    "/top-tracks",
                {
                    headers: {
                        Authorization: "Bearer " + authService.getToken(),
                    },
                    params: {
                        market: "US",
                    },
                }
            )
            .then(({ data }: { data: any }) => {
                return data.tracks;
            }),
    ]);

    return [playlist, tracks];
}

export async function getTrack(trackId: string) {
    let track = await axios
        .get("https://api.spotify.com/v1/tracks/" + trackId, {
            headers: {
                Authorization: "Bearer " + authService.getToken(),
            },
        })
        .then(({ data }: { data: Track }) => {
            return data;
        });

    return track;
}

/*

export async function getGenres() {
    return fetch(
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        {
            headers: {
                Authorization: "Bearer " + authService.getToken(),
            },
        }
    ).then((response) => {
        return response.json();
    });
}

export async function generatePlaylist(
    limit = 20,
    seed_artists,
    seed_genres,
    seed_tracks,
    audio_features
) {
    let stringifySeeds = (seed_artists, seed_genres, seed_tracks) => {
        let num_seeds =
            seed_artists.length + seed_genres.length + seed_tracks.length;
        if (num_seeds > 5 || num_seeds < 1) {
            throw Error("To Many Seeds");
        }
        let artists = seed_artists.join(",");
        let genres = seed_genres.join(",");
        let tracks = seed_tracks.join(",");
        return {
            seed_artists: artists,
            seed_genres: genres,
            seed_tracks: tracks,
        };
    };

    let seeds = stringifySeeds(seed_artists, seed_genres, seed_tracks);
    let accessToken = authService.getToken();

    let args = new URLSearchParams({
        limit: limit,
        ...seeds,
        ...audio_features,
    });

    return fetch("https://api.spotify.com/v1/recommendations?" + args, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    }).then((response) => {
        return response.json();
    });
}

*/
