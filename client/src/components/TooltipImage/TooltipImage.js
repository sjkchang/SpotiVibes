import React, { useEffect, useState } from "react";

import "./TooltipImage.css";

import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";

function Home({ image_url, tip, toggled, toggle, rounded = false }) {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <div
                        className="track-image-wrapper"
                        onClick={() => {
                            toggle();
                        }}
                    >
                        <img
                            src={image_url}
                            className={
                                rounded ? "track-image rounded" : "track-image"
                            }
                        ></img>
                        {toggled() ? (
                            <div
                                className={
                                    rounded
                                        ? "mask always-on rounded"
                                        : "mask always-on"
                                }
                            >
                                <Cross1Icon />
                            </div>
                        ) : (
                            <div
                                className={rounded ? "mask  rounded" : "mask "}
                            >
                                <PlusIcon />
                            </div>
                        )}
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                        {tip}
                        <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

export default Home;
