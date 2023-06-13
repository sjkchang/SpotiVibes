import React from "react";
import "./Popover.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as RadixPopover from "@radix-ui/react-popover";
import * as RadixTooltip from "@radix-ui/react-tooltip";

interface PopoverProps {
    trigger?: string | JSX.Element;
    content?: string | JSX.Element | JSX.Element[];
    side?: "bottom" | "top" | "right" | "left" | undefined;
    sideOffset?: number;
    align?: "center" | "start" | "end" | undefined;
}

function Popover({
    side = "bottom",
    align = "center",
    sideOffset = 5,
    trigger = <></>,
    content = <></>,
}: PopoverProps) {
    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    className="PopoverContent"
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                >
                    {content}
                    <RadixPopover.Close
                        className="PopoverClose"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </RadixPopover.Close>
                    <RadixPopover.Arrow className="PopoverArrow" />
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
}

export default Popover;
