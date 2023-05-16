import axios from "axios";

const setAccessToken = (token: string) => {
    window.localStorage.setItem("spotify_access_token", token);
    setTokenExperation();
};
const setRefreshToken = (token: string) =>
    window.localStorage.setItem("spotify_refresh_token", token);
const setTokenExperation = () => {
    let expiresAt: number = Date.now() + 3600 * 1000;

    window.localStorage.setItem(
        "spotify_token_expires_at",
        expiresAt.toString()
    );
};
const getAccessToken = (): string | null =>
    window.localStorage.getItem("spotify_access_token");
const getRefreshToken = (): string | null =>
    window.localStorage.getItem("spotify_refresh_token");
const getTokenExperation = (): number | null => {
    let expiresAt = window.localStorage.getItem("spotify_token_expires_at");
    if (expiresAt != null) return parseInt(expiresAt);
    return null;
};
const removeAccessToken = (): void =>
    window.localStorage.removeItem("spotify_access_token");
const removeRefreshToken = (): void =>
    window.localStorage.removeItem("spotify_refresh_token");
const removeTokenExperation = (): void =>
    window.localStorage.removeItem("spotify_token_expires_at");

const parseHashParams = (): URLSearchParams => {
    const parsedHash: URLSearchParams = new URLSearchParams(
        window.location.hash.substring(1) // any_hash_key=any_value
    );
    window.history.replaceState(null, "", window.location.pathname);
    return parsedHash;
};

export async function refresh() {
    try {
        const { data } = await axios.get(
            `/refresh_token?refresh_token=${getRefreshToken()}`
        );
        console.log(data);
        const { access_token } = data;
        setAccessToken(access_token);
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
}

export class AuthService {
    authorize(): void {
        const LOGIN_URI =
            process.env.REACT_APP_LOGIN_URI || "http://localhost:8080/login";
        window.location.assign(LOGIN_URI);
    }

    logout(): void {
        removeAccessToken();
        removeRefreshToken();
        removeTokenExperation();
        window.location.reload();
    }

    getToken(): string | null {
        let access_token = getAccessToken();

        //If no current access token, check the hash params
        if (!access_token || access_token === "undefined") {
            let params = parseHashParams();
            access_token = params.get("access_token");
            let refresh_token = params.get("refresh_token");

            if (access_token && refresh_token) {
                setAccessToken(access_token);
                setRefreshToken(refresh_token);
                return access_token;
            }
        }

        let expiresAt = getTokenExperation();
        if (expiresAt != null) {
            if (Date.now() > expiresAt) {
                console.log("Refreshing");
                refresh();
            }
        }

        return access_token;
    }

    isAuthenticated() {
        return this.getToken() ? true : false;
    }
}

export const authService = new AuthService();
