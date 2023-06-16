import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import styled from "styled-components";
import { theme } from "../styles";
const { colors } = theme;
interface sliderProps {
    value?: Array<number>;
    defaultValue?: Array<number>;
    step?: number;
    minStepsBetweenThumbs?: number;
    max?: number;
    min?: number;
    onValueChange?: (value: Array<number>) => void;
    disabled?: boolean;
}

const SliderRoot = styled(SliderPrimitive.Root)`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 100%;
    height: 25px;
`;

const SliderTrack = styled(SliderPrimitive.Track)`
    background-color: ${colors.primary};
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    height: 3px;
`;

const SliderRange = styled(SliderPrimitive.Range)`
    position: absolute;
    background-color: ${colors.accent};
    filter: brightness(120%);
    border-radius: 9999px;
    height: 100%;
`;

const SliderThumb = styled(SliderPrimitive.Thumb)`
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${colors.primary};
    box-shadow: 0 2px 10px ${colors.tertiary};
    border-radius: 50%;
    &:hover {
        filter: brightness(95%);
    }
    &:focus {
        outline: none;
        border: 2px solid var(--accent);
        filter: brightness(120%);
    }
`;

function Slider(props: sliderProps) {
    const value = props.value || props.defaultValue;
    return (
        <SliderRoot {...props}>
            <SliderTrack>
                <SliderRange />
            </SliderTrack>
            <SliderThumb />
        </SliderRoot>
    );
}

export default Slider;
