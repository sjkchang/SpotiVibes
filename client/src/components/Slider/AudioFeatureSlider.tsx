import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSeeds } from "../../redux/slices/seedsSlice";
import { generatePlaylist, Min_Max_Target } from "../../spotify/service";
import Slider from "../../components/Slider/Slider";

interface AudioFeatureSliderProps {
    label: string;
    min?: number;
    max: number;
    value: Min_Max_Target;
    step?: number;
    setFeature: (feature: Min_Max_Target) => void;
}

function AudioFeatureSlider({
    label,
    min = 0,
    max,
    value,
    step = (max - min) / 100,
    setFeature,
}: AudioFeatureSliderProps) {
    let currentValue: Array<number> = [];

    if (value) {
        if (value.target != undefined) {
            currentValue[0] = value.target;
        }
    }
    return (
        <div>
            <label>{label}</label>
            <label>{currentValue[0]}</label>
            <Slider
                value={currentValue}
                max={max}
                min={min}
                step={step}
                onValueChange={(value: Array<number>) => {
                    setFeature({
                        target: value[0],
                    });
                }}
            ></Slider>
        </div>
    );
}

export default AudioFeatureSlider;
