import React, {useEffect, useState} from 'react';
import {getTopItems} from '../spotify/service';

function TopArtists({children}) {
    const [data, setData] = useState(null);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchAPI() {
            let response = await getTopItems("artists", "long_term", 50, 0);
            setData(response);
            setArtists(response["items"])
        }
        fetchAPI()
    }, []);
    return (
        <div>
            <ol>
                
            {artists.map((artist, i) => (
                <li key={i}>{artist.name}</li>
            ))}      
                
            </ol>
        </div>
    );
}

export default TopArtists;