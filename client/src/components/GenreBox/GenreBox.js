import React, { useState, useEffect } from "react";
import "./GenreBox.css";
import axios from "axios";
import Select from "react-select";

export const GenreBox = () => {
    const [genres, setGenres] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let fetchAPI = async () => {
            let response = await axios.get("/api/spotify/genres");
            response = response.data.genres;
            let list = [];

            response.forEach((genre) => {
                list.push({ value: genre, label: genre });
            });
            setGenres(list);
            setLoading(false);
        };
        fetchAPI();
    }, []);

    return (
        <div className='GenreBox'>
            <Select
                options={genres}
                isMulti
                name='genres'
                isLoading={isLoading}
                max={2}
                MaxLength={3}
            />
        </div>
    );
};

export default GenreBox;
