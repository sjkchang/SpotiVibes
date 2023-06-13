import React, { Children } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface sliderProps {
    trigger?: string | JSX.Element;
    content?: string | JSX.Element | JSX.Element[];
    delayDuration?: number;
    side?: "bottom" | "top" | "right" | "left" | undefined;
    sideOffset?: number;
    align?: "center" | "start" | "end" | undefined;
}

function Tooltip({
    trigger = <></>,
    content = <></>,
    delayDuration = 200,
    side = "right",
    sideOffset = 5,
    align = "center",
}: sliderProps) {
    return (
        <RadixTooltip.Provider delayDuration={delayDuration}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className="TooltipContent"
                        sideOffset={sideOffset}
                        side={side}
                        align={align}
                    >
                        {content}
                        <RadixTooltip.Arrow className="TooltipArrow" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
}

export default Tooltip;
