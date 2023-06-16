import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as RadixPopover from "@radix-ui/react-popover";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styled from "styled-components";
import { theme } from "../styles";

const { colors } = theme;
interface PopoverProps {
    trigger?: string | JSX.Element;
    content?: string | JSX.Element | JSX.Element[];
    side?: "bottom" | "top" | "right" | "left" | undefined;
    sideOffset?: number;
    align?: "center" | "start" | "end" | undefined;
    includeClose?: boolean;
    contentWidth?: number;
}

const PopoverContent = styled(RadixPopover.Content)`
    background-color: ${colors.tertiary};
    z-index: 100;
    border-radius: 4px;
    padding: 20px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;

    &[data-state="open"][data-side="top"] {
        animation-name: slideDownAndFade;
    }
    &[data-state="open"][data-side="right"] {
        animation-name: slideLeftAndFade;
    }
    &[data-state="open"][data-side="bottom"] {
        animation-name: slideUpAndFade;
    }
    &[data-state="open"][data-side="left"] {
        animation-name: slideRightAndFade;
    }
`;

const PopoverClose = styled(RadixPopover.Close)`
    all: unset;

    font-family: inherit;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${colors.primary};
    position: absolute;
    top: 5px;
    right: 5px;

    &:hover {
        color: ${colors.secondary};
    }
`;

const PopoverArrow = styled(RadixPopover.Arrow)`
    fill: ${colors.tertiary};
`;

function Popover({
    side = "bottom",
    align = "center",
    sideOffset = 5,
    trigger = <></>,
    content = <></>,
    contentWidth = 300,
    includeClose = true,
}: PopoverProps) {
    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
            <RadixPopover.Portal>
                <PopoverContent
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                    style={{ width: contentWidth }}
                >
                    {content}
                    {includeClose && (
                        <PopoverClose aria-label="Close">
                            <Cross2Icon />
                        </PopoverClose>
                    )}

                    <PopoverArrow className="PopoverArrow" />
                </PopoverContent>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
}

export default Popover;
