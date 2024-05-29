import React from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.black};
`;

const TextContainer = styled.div`
    max-width: 80%;
    padding: 20px;
    text-align: center;
`;

const Text = styled.h1`
    font-size: 18px;
    font-family: logo;
    color: ${theme.colors.white};
`;

const EngText = styled.h1`
    font-size: 18px;
    font-family: englogo;
    color: ${theme.colors.white};
`;

const Loading = () => {
    return (
        <Base>
            <TextContainer>
                <Text>내 손안의 영문법</Text>
                <EngText>Gramary</EngText>
            </TextContainer>
            <TextContainer>
                <Text>생성 중</Text>
            </TextContainer>
        </Base>
    );
}

export default Loading;