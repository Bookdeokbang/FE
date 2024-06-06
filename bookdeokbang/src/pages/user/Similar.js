import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link, useNavigate } from 'react-router-dom';
import { TokenAxios } from '../../apis/CommonAxios';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';


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
    background-color: transparent;
    margin-bottom: 20px;
    border-radius: 10px;
 
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
    margin: 0; /* Remove default margin */
    text-align: center; /* Center the text horizontally */
    display: flex;
    align-items: center; /* Center the text vertically */
    justify-content: center; /* Center the text horizontally */
    height: 100%;
`;

const Similar = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleStudytDetail = async (num) => {
        try {
            setLoading(true);
            await TokenAxios.post(`${API_BASE_URL}/v1/sentences/note`, {
                sentenceId: state[num].id,
                title: state[num].content, // Use dynamic title
                content: state[num].grammar // Use dynamic content
            }, {
            });
            setTimeout(() => {
                navigate(`/studydetail/${state[num].id}?title=${encodeURIComponent(state[num].content)}&content=${encodeURIComponent(state[num].grammar)}`);
                setLoading(false);

            }, 2000);

        } catch (e) {
            console.log("fail");
        }
    }

    return (
        <Base>
            {loading && <LoadingComponent />}
            <Container>
                <Title>
                    <Font_Title>AI가 추천하는 유사문장</Font_Title>
                </Title>
                    
                <WhiteBox1>
                 <Font_Body>{state[0].content}</Font_Body>
                 </WhiteBox1>
                        <CustomButton onClick={()=>handleStudytDetail(0)}>추천문장 저장하기</CustomButton>
                 <WhiteBox1>
                 <Font_Body>{state[1].content}</Font_Body>
                 </WhiteBox1>
                        <CustomButton onClick={()=>handleStudytDetail(1)}>추천문장 저장하기</CustomButton>
                 <WhiteBox1>
                 <Font_Body>{state[2].content}</Font_Body>
                 </WhiteBox1>
                        <CustomButton onClick={()=>handleStudytDetail(2)}>추천문장 저장하기</CustomButton>
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