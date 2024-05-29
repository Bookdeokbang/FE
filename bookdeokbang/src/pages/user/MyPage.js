import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.beige};
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: ${theme.colors.beige};
`;

const GrayBox = styled.div`
    width: 100%;
    height: 80px;
    background-color: #F0F0F0;
    margin-top: 20px;
    margin-bottom: 10px;
    border-radius: 15px;
    box-sizing: border-box;
`;

const SmallWhiteBox = styled(Link)`
    width: 60px;
    height: 60px;
    background-color: #fff;
    margin: 10px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: ${theme.colors.beige};
`;

const Box = styled.div`
    width: 100%;
    height: 40px;
    background-color: #fff;
    margin-bottom: 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    background-color: ${theme.colors.beige};
`;

const Title = styled.div`
    margin-bottom: 1vh;
    background-color: ${theme.colors.beige};
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto;
    text-align: center;
    color: #333; /* Adjusted text color */
`;

const Font_Body = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    text-align: left;
    background-color: ${theme.colors.beige};
    color: black; // 항상 검정색으로 설정

`;

const Font_Content = styled.h1`
    font-size: 13px;
    font-family: 'Logo';
    text-align: left;
    background-color: ${theme.colors.beige};
    color: black; // 항상 검정색으로 설정
`;


const Bottom = styled.div`
   
    height: 100px;
    width: 100%;
    background-color: ${theme.colors.beige};
`;

const MyPage = () => {
    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>마이페이지</Font_Title>
                </Title>
             
                <Box>
                    <Font_Body>나의 질문</Font_Body>
                </Box>
                <Box>
                    <Link to="/search">
                        <Font_Content> - 최근 검색 내역</Font_Content>
                    </Link>
                </Box>
                <Box>
                    <Font_Body>프로필</Font_Body>
                </Box>
                <Box>
                    <Link to="/profile">
                        <Font_Content> - 회원 정보 보기</Font_Content>
                    </Link>
                </Box>
                <Box>
                    <Link to="/withdraw">
                        <Font_Content> - 서비스 탈퇴</Font_Content>
                    </Link>
                </Box>
                <Box>
                    <Link to="/question">
                    <Font_Body>자주 묻는 질문</Font_Body>
                    </Link>
                </Box>
                <Box>
                <Link to="/inquiry">
                    <Font_Body>1:1 문의 내역</Font_Body>
                    </Link>
                </Box>
                <Box>
                <Link to="/info">
                    <Font_Body>공지사항</Font_Body>
                    </Link>
                </Box>

                {/* Rest of your code */}

                <Bottom/>
            </Container>
        </Base>
    );
}

export default MyPage;