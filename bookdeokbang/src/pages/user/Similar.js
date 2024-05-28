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
    height: 100px;
    background-color: #fff;
    margin-bottom: 5px;
    margin-top: 5px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const WhiteBox2 = styled.div`
    width: 100%;
    height: 50px;
    background-color: transparent;
    margin-bottom: 15px;
    border-radius: 8px;
    
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
background-color: transparent;
color: #000000; /* 검정색으로 설정 */
&:hover {
    background-color: transparent;
}
font-family: 'Logo';
width: 100%;
height: 50px;
font-size: 15px;
align-self: center;
margin-top: 10px;
`;


const CustomButton2 = styled(Button)`
    background-color: #111111;
    color: #ffffff; /* 검정색으로 설정 */
    &:hover {
        background-color: #111111;
    }
    font-family: 'Logo';
    width: 100%;
    height: 50px;
    font-size: 15px;
    align-self: center;
    margin-top: 10px;
`;

const Font_Title = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    margin: 0;
    text-align: left;
`;

const Font_Body = styled.h1`
    font-size: 16px;
    font-family: 'engLogo';
    margin: 5;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Similar = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { grammar, difficulty } = useParams();
    const [analysisResult, setAnalysisResult] = useState([]);

    const fetchData = async () => {
        try {
            const res = await TokenAxios.get(`${API_BASE_URL}/v1/sentences/${grammar}/${difficulty}/recommend`);
            const data = res.data.result;
            setAnalysisResult(res.data.result);

            console.log(data);
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
                    <Font_Body>유사 문장1</Font_Body>
                   
                </WhiteBox1>
                <Link to={{
                        pathname: `/studydetail/${analysisResult.content}`,
                        state: { content: analysisResult.content }
                    }}>
                        <CustomButton>추천문장 저장하기</CustomButton>
                    </Link>
                <WhiteBox1>
                    <Font_Body>유사 문장2</Font_Body>
                    
                </WhiteBox1>
                <Link to={{
                        pathname: `/studydetail/${analysisResult.content}`,
                        state: { content: analysisResult.content }
                    }}>
                        <CustomButton>추천문장 저장하기</CustomButton>
                    </Link>
                <WhiteBox1>
                    <Font_Body>유사 문장3</Font_Body>
                    
                </WhiteBox1>

                <Link to={{
                        pathname: `/studydetail/${analysisResult.content}`,
                        state: { content: analysisResult.content }
                    }}>
                        <CustomButton>추천문장 저장하기</CustomButton>
                    </Link>
                    <WhiteBox2>
                    <Link to="/main">
                    <CustomButton2>학습 종료</CustomButton2>
                </Link>
                </WhiteBox2>
               
            </Container>
        </Base>
    );
}

export default Similar;
