import React, { useEffect, useState } from "react";
import { getProfile } from "../spotify/service";

function UserProfile({ children }) {
    const [data, setData] = useState("");
    useEffect(() => {
        async function fetchAPI() {
            let response = await getProfile();
            setData(response);
        }
        fetchAPI();
    }, []);
    return (
        <div>
            <div>{data ? <p>{JSON.stringify(data)}</p> : "nope"}</div>
        </div>
    );
}

export default UserProfile;
