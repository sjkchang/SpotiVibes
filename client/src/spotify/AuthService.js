import axios from "axios";

const setAccessToken = (token) => {
    window.localStorage.setItem("spotify_access_token", token);
    setTokenExperation();
};
const setRefreshToken = (token) =>
    window.localStorage.setItem("spotify_refresh_token", token);
const setTokenExperation = () => {
    let expiresAt = Date.now() + 3600 * 1000;
    window.localStorage.setItem("spotify_token_expires_at", expiresAt);
};
const getAccessToken = () =>
    window.localStorage.getItem("spotify_access_token");
const getRefreshToken = () =>
    window.localStorage.getItem("spotify_refresh_token");
const getTokenExperation = () =>
    window.localStorage.getItem("spotify_token_expires_at");
const removeAccessToken = () =>
    window.localStorage.removeItem("spotify_access_token");
const removeRefreshToken = () =>
    window.localStorage.removeItem("spotify_refresh_token");
const removeTokenExperation = () =>
    window.localStorage.removeItem("spotify_token_expires_at");

const parseHashParams = () => {
    const parsedHash = new URLSearchParams(
        window.location.hash.substring(1) // any_hash_key=any_value
    );
    window.history.replaceState(null, "", window.location.pathname);
    return parsedHash;
};

export class AuthService {
    authorize() {
        const LOGIN_URI =
            process.env.REACT_APP_LOGIN_URI || "http://localhost:8080/login";
        window.location = LOGIN_URI;
    }

    logout() {
        removeAccessToken();
        removeRefreshToken();
        removeTokenExperation();
        window.location.reload();
    }

    getToken() {
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
        console.log(access_token);
        return access_token;
    }

    async refresh() {
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

    isAuthenticated() {
        return this.getToken() ? true : false;
    }
}

export const authService = new AuthService();
