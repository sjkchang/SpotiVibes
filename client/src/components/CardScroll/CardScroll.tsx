import React from "react";
import SpotifyTypes from "spotify-types";
import Card from "../Card/Card";
import "./CardScroll.css";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface CardScrollProps {
    items:
        | Array<SpotifyTypes.Artist>
        | Array<SpotifyTypes.Track>
        | Array<SpotifyTypes.Playlist>;
}

function CardScroll({ items }: CardScrollProps) {
    const onWheel = (e: any) => {
        // here im handling the horizontal scroll inline, without the use of hooks
        console.log("Scroll");
        const strength = Math.abs(e.deltaY);
        if (e.deltaY === 0) return;

        const el = e.currentTarget;
        if (
            !(el.scrollLeft === 0 && e.deltaY < 0) &&
            !(
                el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) ===
                    0 && e.deltaY > 0
            )
        ) {
            e.preventDefault();
        }
        el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            // large scrolls with smooth animation behavior will lag, so switch to auto
            behavior: strength > 70 ? "auto" : "smooth",
        });
    };

    return (
        <ScrollArea.Root className="ScrollAreaRoot">
            <ScrollArea.Viewport
                className="ScrollAreaViewport"
                onWheel={onWheel}
            >
                <div className="ScrollArea">
                    {items.map((item) => (
                        <Card item={item}></Card>
                    ))}
                </div>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
                className="ScrollAreaScrollbar"
                orientation="horizontal"
            >
                <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="ScrollAreaCorner" />
        </ScrollArea.Root>
    );
}

export default CardScroll;
