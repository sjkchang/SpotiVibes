import React, {useEffect, useState} from 'react';
import {getTopItems} from '../spotify/service';

function TopTracks({children}) {
    const [data, setData] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        async function fetchAPI() {
            let response = await getTopItems("tracks", "medium_term", 50, 0);
            setData(response);
            setTracks(response["items"])
        }
        fetchAPI()
    }, []);
    return (
        <div>
            <ol>
                
            {tracks.map((track, i) => (
                <li key={i}>{track.name}</li>
            ))}      
                
            </ol>
        </div>
    );
}

export default TopTracks;
