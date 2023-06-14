import { css } from "styled-components";
import { TupleType } from "typescript";

const sizes = {
    giant: 1440,
    desktop: 1200,
    netbook: 1000,
    tablet: 768,
    thone: 600,
    phablet: 480,
    phone: 376,
    tiny: 330,
};

let mediaIze = (emSize) => {
    return (...args) => css`
        @media (max-width: ${emSize / 16}em) {
            ${css(...args)};
        }
    `;
};

// iterate through the sizes and create a media template
const media = {
    giant: mediaIze(sizes.giant),
    desktop: mediaIze(sizes.desktop),
    netbook: mediaIze(sizes.netbook),
    tablet: mediaIze(sizes.tablet),
    thone: mediaIze(sizes.thone),
    phablet: mediaIze(sizes.phablet),
    phone: mediaIze(sizes.phone),
    tiny: mediaIze(sizes.tiny),
};

export default media;
