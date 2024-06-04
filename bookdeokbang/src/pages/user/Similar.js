import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { TokenAxios } from '../../apis/CommonAxios';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

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
`;

const WhiteBox1 = styled.div`
    width: 100%;
    height: 120px;
    background-color: #fff;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const SaveBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
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
    font-size: 15px;
    align-self: center;
`;

const Font_Title = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    margin: 0;
    text-align: left;
`;

const Font_Body = styled.h1`
    font-size: 20px;
    font-family: 'engLogo';
    margin: 5;
    text-align: center;
    line-height: 120px; 
`;

const Similar = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { grammar, difficulty } = useParams();
    const [sentences, setSentences] = useState([]);

    const fetchData = async () => {
        try {
            const res = await TokenAxios.get(`${API_BASE_URL}/v1/sentences/${grammar}/${difficulty}/recommend`);
            const data = res.data.result;
            setSentences(data);
        } catch (error) {
            console.error('Error fetching recommended sentences:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>AI가 추천하는 유사문장</Font_Title>
                </Title>
                    
                <WhiteBox1>
                 <Font_Body>{sentences.content}</Font_Body>
                 </WhiteBox1>
                 <WhiteBox1>
                 <Font_Body>{sentences.content}</Font_Body>
                 </WhiteBox1>

                 <WhiteBox1>
                 <Font_Body>{sentences.content}</Font_Body>
                 </WhiteBox1>

        
                <SaveBox>
                    <Link to="/studynote">
                        <CustomButton>추천문장 저장하기</CustomButton>
                    </Link>
                </SaveBox>
                <SaveBox>
                    <Link to="/main">
                        <CustomButton>학습 종료</CustomButton>
                    </Link>
                </SaveBox>
            </Container>
        </Base>
    );
}

export default Similar;
