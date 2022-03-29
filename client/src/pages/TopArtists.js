import React, { useState, useEffect } from "react";
import axios from "axios";
import Artist from "../components/Artist/Artist";

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
        return <Artist artist={artist} key={index} />;
      })}
    </div>
  );
};

export default TopArtists;
