import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import { generatePlaylist, Min_Max_Target } from "../../spotify/service";
import Slider from "../../components/Slider/Slider";

interface AudioFeatureSliderProps {
    label: string;
    min: number;
    max: number;
    value: Min_Max_Target;
    step?: number;
    setFeature:
        | ((key: string, feature: Min_Max_Target) => void)
        | ((feature: Min_Max_Target) => void);
}

function AudioFeatureSlider({
    label,
    min,
    max,
    value,
    step = 0.05,
    setFeature,
}: AudioFeatureSliderProps) {
    let currentValue: Array<number> = [];

    if (value) {
        if (value.target) {
            currentValue[0] = value.target;
        }
    }
    return (
        <div>
            <label>{label}</label>
            <Slider
                defaultValue={[(max - min) / 2]}
                value={currentValue}
                max={max}
                min={min + step}
                step={step}
                onValueChange={(value: Array<number>) => {
                    setFeature(label, {
                        target: value[0],
                    });
                }}
            ></Slider>
        </div>
    );
}

export default AudioFeatureSlider;
