import React, { useState, useEffect } from "react";
import axios from "axios";

export const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      let response = await axios.get("/api/spotify/top-artists");
      let list = [];

      response.data.items.forEach((artist) => {
        list.push(artist);
      });
      console.log(list);

      setArtists(list);
      setIsLoading(false);
    }
    fetchAPI();
  }, []);

  return (
    <div className="TopArtists">
      <p>Top artists:</p>
      {artists.map((artist, index) => {
        return (
          <li>
            <img src={artist.images[0].url} alt={artist.name}></img>
            <p>{artist.name}</p>
          </li>
        );
      })}
    </div>
  );
};

export default TopArtists;
