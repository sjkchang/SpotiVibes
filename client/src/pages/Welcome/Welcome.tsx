import React from "react";
import { Button } from "../../styles";
import styled from "styled-components/macro";
import { theme, media } from "../../styles";

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
`;

function Welcome({ login }: any) {
    return (
        <Content>
            <h1>Welcome to SpotiVibes</h1>
            <Button className="welcome-btn" onClick={login}>
                Login
            </Button>
        </Content>
    );
}

export default Welcome;
