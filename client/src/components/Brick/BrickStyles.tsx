import React from "react";
import styled from "styled-components";
import { theme, mixins } from "../../styles";
const { colors } = theme;

export const Brick = styled.div`
    flex-grow: 1;
    list-style: none;
    display: grid;
    grid-template-columns: auto 1fr;
    -moz-box-align: center;
    align-items: center;
    margin-bottom: 10px;
    height: 70px;
    padding: 10px;
    border-radius: 5px;

    min-width: 250px;

    &:hover {
        background-color: ${colors.tertiary};
    }
`;

export const BrickInfo = styled.div`
    font-size: 1.1rem;
    margin-left: 20px;
    ${mixins.overflowEllipsis}
`;

export const BrickTitle = styled.div`
    ${mixins.overflowEllipsis}

    a {
        ${mixins.overflowEllipsis}
    }
`;

export const BrickDescription = styled.span`
    ${mixins.overflowEllipsis}
    padding-right: 1px;
    font-size: 14px;
    margin-top: 3px;
    padding-bottom: 5px;
    color: ${colors.secondary};

    a:hover {
        text-decoration: underline;
    }
`;
