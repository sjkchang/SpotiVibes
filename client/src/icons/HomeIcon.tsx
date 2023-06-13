import React from "react";
import IconProps from "./IconProps";

function HomeIcon({ fill, width = 25, height = 25 }: IconProps) {
    return (
        <div style={{ color: "transparent" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
                width={width}
                height={height}
            >
                <g>
                    <path
                        fill={fill}
                        d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"
                    />
                    <g>
                        <path
                            fill={fill}
                            d="M362.667,383.841v128H448c35.346,0,64-28.654,64-64V253.26c0.005-11.083-4.302-21.733-12.011-29.696l-181.29-195.99    c-31.988-34.61-85.976-36.735-120.586-4.747c-1.644,1.52-3.228,3.103-4.747,4.747L12.395,223.5    C4.453,231.496-0.003,242.31,0,253.58v194.261c0,35.346,28.654,64,64,64h85.333v-128c0.399-58.172,47.366-105.676,104.073-107.044    C312.01,275.383,362.22,323.696,362.667,383.841z"
                        />
                        <path
                            fill={fill}
                            d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default HomeIcon;
