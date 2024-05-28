import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { Button } from "@mui/material";

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

const ContentBox = styled.div`
    width: 100%;
    height: 450px;
    background-color: #F0F0F0;
    margin-top: 10px; /* 위쪽 여백 */
    margin-bottom: 0px; /* 아래쪽 여백 */
    border-radius: 10px;
    box-sizing: border-box; /* 테두리를 포함한 전체 크기를 유지하도록 설정 */
    border: 0.8px solid ${theme.colors.black}; /* 테두리 추가 */
`;

const CustomButton = styled(Button)`
    background-color: #00000;
    color: #000000;
    &:hover {
        background-color: transparent;
    }
    font-family: Logo;
    width: 150px;
    height: 50px;
    font-size: 18px;
    align-self: center;
`;


const Title=styled.div`
    margin-bottom:1vh;
    margin-top: 30px;
`;
const Body = styled.div`
    width: 100%; /* 최대 너비 설정 */
`;
const Bottom=styled.div`
    height: 100px; /* 고정 높이값 */
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
    font-size: 18px;
    font-family: 'Logo';
    text-align: left;
    color:white;
`;

const Policy = () => {
    return (
    <Base>
        <Container>
            <Title>
                <Font_Title>운영정책</Font_Title>
            </Title>
            <ContentBox/> 
            <Link to="/question">
                <CustomButton>
                    돌아가기
                </CustomButton>
            </Link>
        </Container>
    </Base>
    );
}


export default Policy;
