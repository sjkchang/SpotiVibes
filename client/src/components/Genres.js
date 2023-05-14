import React, { useEffect, useState, useCallback } from "react";
import { getGenres } from "../spotify/service";

function Genres({ seeds, setSeeds }) {
    const [items, setitems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchAPI() {
        let response = await getGenres();
        return response["genres"];
    }

    useEffect(() => {
        if (items.length == 0) {
            fetchAPI()
                .then((data) => {
                    console.log("Items: " + data);
                    setitems(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    if (items) {
        return (
            <div>
                <ol>
                    {items.map((item, i) => (
                        <li key={i}>
                            {item}
                            {seeds.includes(item) ? (
                                <button
                                    onClick={() => {
                                        setSeeds((seeds) => {
                                            return seeds.filter(
                                                (seeds) => seeds != item
                                            );
                                        });
                                    }}
                                >
                                    Remove Seed
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (seeds.length < 5) {
                                            setSeeds((seeds) => [
                                                ...seeds,
                                                item,
                                            ]);
                                        }
                                    }}
                                >
                                    Add Seed
                                </button>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        );
    } else {
        return <div>No Genres Found</div>;
    }
}

export default Genres;
