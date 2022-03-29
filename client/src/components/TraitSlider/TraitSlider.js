import React, { useState, useEffect } from "react";
import "./TraitSlider.css";
import "rc-slider/assets/index.css";
import { Range } from "rc-slider";

export const TraitSlider = ({
  name = "unnamed",
  min = 0,
  max = 1,
  step = 0.05,
  updateSeeds,
}) => {
  let target = (max - min) / 2;
  const [values, setValues] = useState([min + step, target, max - step]);
  const [disabled, setDisabled] = useState(true);

  const addValuesToSeeds = () => {
    let min = "min-" + name;
    let target = "target-" + name;
    let max = "max-" + name;
    let seeds = {};
    seeds[min] = values[0];
    seeds[target] = values[1];
    seeds[max] = target[2];
    updateSeeds(seeds);
  };

  return (
    <div className="TraitSlider">
      <strong>{name}: </strong>
      <button
        onClick={() => {
          setDisabled(!disabled);
        }}
      >
        {disabled ? `Use ${name}` : `Disable ${name}`}
      </button>
      <p>
        Min: {values[0]} target: {values[1]} max: {values[2]}
      </p>
      <Range
        min={min}
        max={max}
        defaultValue={values}
        step={step}
        count={2}
        allowCross={false}
        onChange={(value) => {
          setValues(value);
        }}
        //onAfterChange={onAfterChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TraitSlider;
