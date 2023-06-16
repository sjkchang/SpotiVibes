import { useState, useEffect, DependencyList } from "react";
import axios from "axios";
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
    const [error, setError] = useState("");
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, {
            headers: {
                ...{ Authorization: "Bearer " + authService.getToken() },
                ...headers,
            },
            params: body,
        })
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError("Something went wrong");
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, deps);

    return { response, error, loading };
}

export default useSpotifyApi;
