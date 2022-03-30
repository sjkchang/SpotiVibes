import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackList from "../components/TrackList/TrackList";

export const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      let response = await axios.get("/api/spotify/top-tracks");
      let list = [];

      response.data.items.forEach((track) => {
        list.push(track);
      });
      console.log(list);

      setTracks(list);
      setIsLoading(false);
    }

    fetchTracks();
  }, []);

  return (
    <div className="TopTracks">
      {isLoading ? "Loading" : <TrackList tracks={tracks} />}
    </div>
  );
};

export default TopTracks;
