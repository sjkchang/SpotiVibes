import React, { useEffect, useState, useCallback } from "react";
import { getTopItems } from "../spotify/service";

function TopItems({ type = "items", term = "medium_term" }) {
    const [items, setitems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchAPI(offset) {
        let response = await getTopItems(type, term, 10, offset);
        return response["items"];
    }

    useEffect(() => {
        fetchAPI(0)
            .then((items) => {
                setitems(items);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const addItems = useCallback(() => {
        setLoading(true);
        fetchAPI(items.length)
            .then((newItems) => {
                setitems((items) => [...items, ...newItems]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <div>
            <ol>
                {items.map((item, i) => (
                    <li key={i}>{item.name}</li>
                ))}
                {loading ? <li>loading...</li> : null}
            </ol>
            <button
                disabled={items.length >= 50 ? true : false}
                onClick={addItems}
            >
                See More
            </button>
        </div>
    );
}

export default TopItems;
