import React, { useEffect } from "react";

function TestComponent({ item }) {
    useEffect(() => {
        console.log(item);
    });
    return <div className="Artist"></div>;
}

export default TestComponent;
