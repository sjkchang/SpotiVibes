import React, { Children } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface sliderProps {
    label: string;
    children: any;
}

function Tooltip(props: sliderProps) {
    return (
        <RadixTooltip.Provider delayDuration={200}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                    {props.children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className="TooltipContent"
                        sideOffset={5}
                    >
                        {props.label}
                        <RadixTooltip.Arrow className="TooltipArrow" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
}

export default Tooltip;
