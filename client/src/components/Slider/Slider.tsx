import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import "./Slider.css";
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

function Slider(props: sliderProps) {
    const value = props.value || props.defaultValue;
    return (
        <SliderPrimitive.Root {...props} className="SliderRoot">
            <SliderPrimitive.Track className="SliderTrack">
                <SliderPrimitive.Range className="SliderRange" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="SliderThumb" />
        </SliderPrimitive.Root>
    );
}

export default Slider;
