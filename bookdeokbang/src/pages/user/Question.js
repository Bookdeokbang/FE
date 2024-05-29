import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-bottom: 120px; /* 위쪽 여백 설정 */
    align-items: center;
    background-color: ${theme.colors.white};
`;
const Container = styled.div`
    width: 100%;
    margin-top: 0px;

    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    justify-content: center; /* 수직 가운데 정렬 */
    align-items: center; /* 수평 가운데 정렬 */
`;

const TitleBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: #F0F0F0;
    margin-top: 10px; /* 위쪽 여백 */
    margin-bottom: 5px; /* 아래쪽 여백 */
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.8px solid ${theme.colors.black}; /* 테두리 추가 */
`;

const Title=styled.div`
    margin-bottom:7vh;
    margin-top: 10px;
`;
const Body = styled.div`
    width: 100%; /* 최대 너비 설정 */
`;
const Bottom=styled.div`
    height: 200px; /* 고정 높이값 */
    width: 100%; /* 최대 너비 설정 */
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto; /* 수평 가운데 정렬 */
    text-align:center;
`;

const Font_Body = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    text-align: left;
`;
const Font_Content = styled.h1`
    font-size: 15px;
    font-family: 'Logo';
    text-align: left;
    color:black;
`;

const Question = () => {
    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>자주 묻는 질문</Font_Title>
                </Title>
                <TitleBox>
                    <Link to="/terms">
                        <Font_Content>이용약관</Font_Content>
                    </Link>
                </TitleBox>
                <TitleBox>
                    <Link to="/personaldata">
                        <Font_Content>개인 정보 처리 방침</Font_Content>
                    </Link>
                </TitleBox>
                <TitleBox>
                    <Link to="/policy">
                        <Font_Content>운영정책</Font_Content>
                    </Link>
                </TitleBox>
                <Bottom></Bottom>
            </Container>
        </Base>
    );
}

export default Question;