import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom"; 
import { TokenAxios } from "../../apis/CommonAxios";

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-bottom: 120px;
    align-items: center;
    background-color: ${theme.colors.white};
`;

const Container = styled.div`
    width: 100%;
    margin-top: 0px;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileBox = styled.div`
    width: 200px;
    height: 200px;
    background-color: #F0F0F0;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${theme.colors.black};
`;

const Title = styled.div`
    margin-bottom: 1vh;
    margin-top: 30px;
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto;
    text-align: center;
`;

const Font_Content = styled.h1`
    font-size: 18px;
    font-family: 'Logo';
    text-align: left;
    color: white;
`;

const Withdraw = () => {
    const navigate = useNavigate(); // useHistory 훅 사용

    const handleWithdrawal = async () => {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        try {
            const res = await TokenAxios.patch(`${API_BASE_URL}/v1/users/me/quit`);
            console.log('Good Bye');
            navigate("/"); // 탈퇴 성공 시 메인 페이지로 이동
        } catch (error) {
            console.error("탈퇴 요청 에러:", error);
        }
    };

    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>탈퇴하시겠습니까?</Font_Title>
                </Title>
                <ProfileBox>
                    {/* 프로필 이미지 */}
                </ProfileBox>
                <Button variant="contained" onClick={handleWithdrawal} sx={{ backgroundColor: '#000', color: '#fff' }}>
                    <Font_Content>탈퇴하기</Font_Content>
                </Button>
            </Container>
        </Base>
    );
}

export default Withdraw;
