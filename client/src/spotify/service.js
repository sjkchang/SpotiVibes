export async function getProfile() {
    let accessToken = localStorage.getItem("access_token");

    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });

    const data = await response.json();

    return data;
}

export async function getTopItems(
    type = "tracks",
    timeRange = "medium_term",
    limit = 20,
    offset = 0
) {
    let accessToken = localStorage.getItem("access_token");

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

    const response = await fetch(
        "https://api.spotify.com/v1/me/top/" + type + "?" + args,
        {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    const data = await response.json();
    return data;
}

export async function getPlaylists(limit = 20, offset = 0) {
    let accessToken = localStorage.getItem("access_token");

    if (limit < 0 || limit > 50) throw Error("Invalid Limit:" + limit);
    if (offset < 0 || offset > 100_000) throw Error("Invalid Limit:" + limit);

    let args = new URLSearchParams({
        limit: limit,
        offset: offset,
    });

    const response = await fetch(
        "https://api.spotify.com/v1/me/playlists/?" + args,
        {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    const data = await response.json();
    return data;
}
