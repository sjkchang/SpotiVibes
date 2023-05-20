import React, { useEffect, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface sliderProps {
    value?: Array<number>;
    defaultValue: Array<number>;
    step?: number;
    minStepsBetweenThumbs?: number;
    max?: number;
    min?: number;
    onValueChange?: (value: Array<number>) => void;
}

function Slider(props: sliderProps) {
    const value = props.value || props.defaultValue;
    return (
        <form>
            <SliderPrimitive.Root {...props} className="SliderRoot">
                <SliderPrimitive.Track className="SliderTrack">
                    <SliderPrimitive.Range className="SliderRange" />
                </SliderPrimitive.Track>
                {value.map((val: number, i: number) => (
                    <SliderPrimitive.Thumb key={i} className="SliderThumb" />
                ))}
            </SliderPrimitive.Root>
        </form>
    );
}

export default Slider;
