import React, { ReactNode } from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
`;

const Image = styled.img<{ shape: "square" | "circle" | "rounded" }>`
    border-radius: ${(props) =>
        props.shape == "rounded" ? 15 : props.shape == "circle" ? 50 : 0}%;
    display: inline-block;
    position: relative;
    aspect-ratio: 1/1;
`;

const IconMask = styled.div<{ shape?: "square" | "circle" | "rounded" }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    color: white;

    border-radius: ${(props) =>
        props.shape == "rounded" ? 15 : props.shape == "circle" ? 50 : 0}%;

    background-color: rgba(0, 0, 0, 0.5);
    &:hover {
        opacity: 1;
    }
`;

interface ImageOverlayIconProps {
    image_url: string;
    width?: number;
    height?: number;
    Icon: ReactNode;
    shape?: "square" | "circle" | "rounded";
    rounded?: boolean;
}

function ImageOverlayIcon({
    image_url,
    shape = "square",
    rounded = false,
    width,
    height,
    Icon,
}: ImageOverlayIconProps) {
    return (
        <ImageWrapper>
            <Image shape={shape} src={image_url} alt="spotify track"></Image>
            <IconMask shape={shape}>{Icon}</IconMask>
        </ImageWrapper>
    );
}

export default ImageOverlayIcon;
