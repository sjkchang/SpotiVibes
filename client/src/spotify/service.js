import { authService } from "./AuthService";

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

export async function getTopItems(
    type = "tracks",
    timeRange = "medium_term",
    limit = 20,
    offset = 0
) {
    try {
        authService.checkToken();
    } catch (error) {}

    let accessToken = authService.getToken();

    const typeOptions = ["tracks", "artists"];
    if (!typeOptions.includes(type)) throw Error("Invalid type:" + type);

    const timeRangeOptions = ["short_term", "medium_term", "long_term"];
    if (!timeRangeOptions.includes(timeRange))
        throw Error("Invalid Time Range:" + timeRange);

    if (limit < 0 || limit > 50) throw Error("Invalid Limit:" + limit);
    if (offset < 0 || offset > 50) throw Error("Invalid Limit:" + limit);

    let args = new URLSearchParams({
        time_range: timeRange,
        limit: limit,
        offset: offset,
    });

    return fetch("https://api.spotify.com/v1/me/top/" + type + "?" + args, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    }).then((response) => {
        return response.json();
    });
}

export async function getPlaylists(limit = 20, offset = 0) {
    if (limit < 0 || limit > 50) throw Error("Invalid Limit:" + limit);
    if (offset < 0 || offset > 100_000) throw Error("Invalid Limit:" + limit);

    let args = new URLSearchParams({
        limit: limit,
        offset: offset,
    });

    return fetch("https://api.spotify.com/v1/me/playlists/?" + args, {
        headers: {
            Authorization: "Bearer " + authService.getToken(),
        },
    }).then((response) => {
        return response.json();
    });
}

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
