import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";

import styled from "styled-components";
import { mixins, theme } from "../../styles";
const { colors } = theme;

export const HoverIcon = styled.div<{ show?: boolean }>`
    filter: brightness(100%);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: ${theme.colors.accent};
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    margin-bottom: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(p) => (p.show ? 1 : 0)};
    z-index: 99;

    box-shadow: 0px 2px 5px 1px black;

    &:hover {
        filter: brightness(120%);
        border-width: 10px;
        width: 60px;
        height: 60px;
        margin-bottom: 5px;
        margin-right: 5px;
    }
`;

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.tertiary};
    padding: 25px;
    border-radius: 3%;
    cursor: pointer;
    &:hover {
        filter: brightness(120%);
        transition: filter 0.15s linear;
        opacity: 1;
    }

    &:hover .HoverIcon {
        opacity: 1;
    }
`;

export const CardImage = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    img {
        max-width: 100%;
        height: 100%;
    }
`;

export const Title = styled.div`
    ${mixins.overflowEllipsis}

    padding: 5px 0;
    font-size: ${theme.fontSizes.md};
    font-weight: bold;
`;

export const Description = styled.div`
    color: ${colors.secondary};
    ${mixins.overflowEllipsis}

    font-size: ${theme.fontSizes.base};
`;

export const Image = styled.img<{ $rounded?: boolean }>`
    border-radius: ${(props) => (props.$rounded ? "50%" : "0")};
    max-width: 100%;
    height: 100%;
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
`;

export const RoundedImage = styled.img`
    border-radius: 50%;
`;
