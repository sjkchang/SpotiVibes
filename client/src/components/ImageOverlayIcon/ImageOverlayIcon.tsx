import React, { ReactNode } from "react";

import "./ImageOverlayIcon.css";
import { PlusIcon, Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

interface ImageOverlayIconProps {
    image_url: string;
    rounded?: boolean;
    width?: number;
    height?: number;
    Icon: ReactNode;
}

function ImageOverlayIcon({
    image_url,
    rounded = false,
    Icon,
}: ImageOverlayIconProps) {
    return (
        <div className="track-image-wrapper">
            <img
                src={image_url}
                alt="spotify track"
                className={rounded ? "track-image rounded" : "track-image"}
            ></img>

            <div className={rounded ? "mask  rounded" : "mask "}>{Icon}</div>
        </div>
    );
}

export default ImageOverlayIcon;
