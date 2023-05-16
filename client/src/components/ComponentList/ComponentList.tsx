import React from "react";
import { Track, Artist } from "spotify-types";

interface TopItemsListProps extends React.HTMLAttributes<any> {
    items: Array<Track | Artist>;
    children: JSX.Element;
}

function ComponentList({ items, children }: TopItemsListProps) {
    let childProps = (type: string, item: any) => {
        if (type === "track") {
            return { track: item };
        } else if (type === "artist") {
            return { artist: item };
        } else {
            return { item: item };
        }
    };

    return (
        <div>
            <ol>
                {items.map((item, i) => (
                    <li key={i}>
                        {React.cloneElement(
                            children,
                            childProps(item.type, item),
                            null
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ComponentList;
