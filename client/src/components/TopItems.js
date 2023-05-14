import React, { useEffect, useState, useCallback } from "react";
import { getTopItems } from "../spotify/service";
import Track from "./TrackItem/TrackItem";
import Artist from "./ArtistItem/ArtistItem";

function TopItems({ term = "medium_term", children }) {
    const [items, setitems] = useState([]);
    const [loading, setLoading] = useState(true);

    let type = children.type.name == "TrackItem" ? "tracks" : "artists";

    async function fetchAPI(offset) {
        let response = await getTopItems(type, term, 10, offset);
        return response["items"];
    }

    useEffect(() => {
        if (items.length == 0) {
            fetchAPI(0)
                .then((items) => {
                    setitems(items);
                    setLoading(false);
                })
                .catch((error) => {
                    setitems([{ name: "Error: Not Logged In" }]);
                    console.log(error);
                });
        }
    }, []);

    const seeMoreItems = useCallback(() => {
        setLoading(true);
        fetchAPI(items.length)
            .then((newItems) => {
                console.log(items[0]);
                setitems((items) => [...items, ...newItems]);
                setLoading(false);
            })
            .catch((error) => {});
    });

    return (
        <div>
            <ol>
                {items.map((item, i) => (
                    <li key={i}>
                        {React.cloneElement(
                            children,
                            {
                                item: item,
                            },
                            null
                        )}
                    </li>
                ))}
                {loading ? <li>loading...</li> : null}
            </ol>
            <button
                disabled={items.length >= 50 ? true : false}
                onClick={seeMoreItems}
            >
                See More
            </button>
        </div>
    );
}

export default TopItems;
