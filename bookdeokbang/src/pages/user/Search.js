import React from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { Button } from "@mui/material";

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.beige};
`;

const Container = styled.div`
    width: 100%; /* 변경 */
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 변경 */
`;

const Title = styled.div`
    margin-bottom: 2vh;
`;

const CustomButton = styled(Button)`
    background-color: #00000;
    color: #000000;
    &:hover {
        background-color: #11111;
    }
    width: 150px;
    height: 50px;
    font-size: 20px;
    align-self: center;
`;


const WhiteBox1 = styled.div`
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 10px; /* 둥근 모서리 추가 */
    border: 1px solid ${theme.colors.black}; /* 테두리 추가 */
    box-sizing: border-box; /* 테두리를 포함한 전체 크기를 유지하도록 설정 */
`;


const Font_Title = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    margin: 0;
    text-align: left;
`;

const Body = styled.div`
    width: 100%; /* 최대 너비 설정 */
`;

const Search = () => {
    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>최근 검색 내역</Font_Title>
                </Title>
                <WhiteBox1 />
                <WhiteBox1 />
                <WhiteBox1 />
            

                <Body>
            
                </Body>
                <Link to="/main">
                        <CustomButton>
                           돌아가기
                      </CustomButton>
                    </Link>
            </Container>
        </Base>
    );
}

export default Search;