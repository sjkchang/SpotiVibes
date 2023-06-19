import { useState, useEffect, DependencyList } from "react";
import axios, { AxiosError } from "axios";
import { authService } from "../spotify/AuthService";

interface UseSpotifyApiArgs {
    url: string;
    method: "post" | "get" | "delete" | "put";
    body?: any;
    headers?: any;
}

function useSpotifyApi<T>(
    { url, method, body = null, headers = null }: UseSpotifyApiArgs,
    deps: DependencyList = []
) {
    const [response, setResponse] = useState<T>();
    const [error, setError] = useState<Error | AxiosError>();
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        setloading(true);
        axios[method](url, {
            headers: {
                ...{ Authorization: "Bearer " + authService.getToken() },
                ...headers,
            },
            params: body,
        })
            .then((res) => {
                setResponse(res.data);
                setError(undefined);
            })
            .catch((err: Error | AxiosError) => {
                setError(err);
                setResponse(undefined);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        console.log("Fetching: " + url);
        fetchData();
    }, deps);

    return { response, error, loading };
}

export default useSpotifyApi;
