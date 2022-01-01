export const LoggedInItems = [
    {
        title: "My Playlists",
        url: "playlists",
        cName: "nav-links",
        reactUrl: true,
    },
    {
        title: "Top Artists",
        url: "top-artists",
        cName: "nav-links",
        reactUrl: true,
    },
    {
        title: "Generate",
        url: "#",
        cName: "nav-links",
        reactUrl: true,
    },
    {
        title: "Top Songs",
        url: "top-songs",
        cName: "nav-links",
        reactUrl: true,
    },
    {
        title: "logout",
        url: "/api/logout",
        cName: "nav-links-mobile",
        reactUrl: false,
    },
];

export const LoggedOutItems = [
    {
        title: "Sign up",
        url: "/api/login",
        cName: "nav-links-mobile",
        reactUrl: false,
    },
];

//export default { LoggedInItems: LoggedInItems, LoggedOutItems: LoggedOutItems };