import { Artist, Track } from "spotify-types";

interface TopItemsResponse {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}

export interface TopTracksResponse extends TopItemsResponse {
    items: Array<Track>;
}

export interface TopArtistsResponse extends TopItemsResponse {
    items: Array<Artist>;
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
