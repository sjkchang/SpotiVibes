import styled from "styled-components/macro";
import theme from "./theme";
const { fontSizes, colors } = theme;

const Button = styled.button`
    background-color: ${colors.spotifyGreen};
    color: ${colors.primary};
    font-size: ${fontSizes.base};
    cursor: pointer;
    border: 0;
    border-radius: 0;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 11px 24px;
    margin: 20px 0px;
    &:hover {
        filter: brightness(120%);
    }
    &:focus,
    &:active {
        outline: 0;
        filter: brightness(120%);
    }
    &:disabled {
        filter: grayscale(50%);
        border: 1px solid ${colors.secondary};
    }
`;

export default Button;
