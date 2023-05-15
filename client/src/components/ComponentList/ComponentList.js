import React from "react";

function ComponentList({ items, children }) {
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
            </ol>
        </div>
    );
}

export default ComponentList;
