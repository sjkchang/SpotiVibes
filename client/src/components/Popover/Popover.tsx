import React from "react";
import "./Popover.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as RadixPopover from "@radix-ui/react-popover";

interface PopoverProps {
    trigger?: string | JSX.Element;
    content?: string | JSX.Element | JSX.Element[];
}

function Popover({ trigger = <></>, content = <></> }: PopoverProps) {
    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    className="PopoverContent"
                    sideOffset={5}
                    side="bottom"
                    align="start"
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
