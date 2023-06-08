import SpotifyTypes from "spotify-types";

interface TopItemsResponse {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface TopTracksResponse extends TopItemsResponse {
    items: Array<SpotifyTypes.Track>;
}

export interface TopArtistsResponse extends TopItemsResponse {
    items: Array<SpotifyTypes.Artist>;
}

export enum TimeRangeEnum {
    Short = "short_term",
    Medium = "medium_term",
    Long = "long_term",
}

export enum SpotifyTypesEnum {
    Tracks = "tracks",
    Artists = "artists",
}

export class TopItemsQuery {
    type: SpotifyTypesEnum;
    time_range: TimeRangeEnum;
    limit: number;
    offset: number;

    constructor(
        type: SpotifyTypesEnum = SpotifyTypesEnum.Tracks,
        time_range: TimeRangeEnum = TimeRangeEnum.Medium,
        limit: number = 20,
        offset: number = 0
    ) {
        this.type = type;
        this.time_range = time_range;

        if (limit < 0 || limit > 50) throw Error("Invalid Limit:" + limit);
        if (offset < 0 || offset > 50) throw Error("Invalid Limit:" + limit);

        this.limit = limit;
        this.offset = offset;
    }
}

export const isArtist = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Artist =>
    (item as SpotifyTypes.Artist).uri.includes("artist");
export const isTrack = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Track =>
    (item as SpotifyTypes.Track).uri.includes("track");
export const isPlaylist = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Playlist =>
    (item as SpotifyTypes.Playlist).uri.includes("playlist");
export const isAlbum = (
    item:
        | SpotifyTypes.Artist
        | SpotifyTypes.Track
        | SpotifyTypes.Playlist
        | SpotifyTypes.Album
        | undefined
): item is SpotifyTypes.Album =>
    (item as SpotifyTypes.Album).uri.includes("album");
