import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { TokenAxios } from '../../apis/CommonAxios';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    height: 200px;
    background-color: #fff;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SaveBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: transparent; /* 배경색 설정 */
    margin-bottom: 15px;
    border-radius: 8px;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
`;

const Title = styled.div`
    margin-bottom: 1vh;
`;

const Font_Title = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    margin: auto;
    text-align: center;
`;

const CustomButton = styled(Button)`
    background-color: transparent; /* 배경색 설정 */
    color: #000; /* 글씨 색상 설정 */
    &:hover {
        background-color: transparent; /* 호버 시 배경색을 투명하게 설정 */
        color: #000; /* 호버 시 글씨 색상을 검정으로 설정 */
    }
    font-family: 'Logo';
    width: 150px;
    height: 50px;
    font-size: 15px;
    align-self: center;
`;

const CustomButton2 = styled(Button)`
    background-color: #000;
    color: #ffffff; /* 검정색으로 설정 */
    &:hover {
        background-color: #fff;
    }
    font-family: 'Logo';
    width: 100%;
    height: 50px;
    font-size: 15px;
    align-self: center;
    margin-top: 10px;
`;

const Font_Body2 = styled.h1`
    font-size: 16px;
    font-family: 'engLogo';
    margin: 5px;
    text-align: center;
`;

const Analyze = () => {
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { sentenceId } = useParams();
    const [analysisResult, setAnalysisResult] = useState({});
    const [grammar, setGrammar] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
            try {
                const response = await TokenAxios.get(`${API_BASE_URL}/v1/sentences/${sentenceId}/info`);
                setAnalysisResult(response.data.result);
                setGrammar(response.data.result.grammar);
                setDifficulty(response.data.result.difficulty);
            } catch (error) {
                console.error("Error fetching analysis data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (sentenceId) {
            fetchAnalysis();
        }
    }, [sentenceId, API_BASE_URL]);

    const handleSimilarSentenceRecommendation = () => {
        setLoading(true);
        setTimeout(() => {
            navigate(`/similar/${grammar}/${difficulty}`);
            setLoading(false);
        }, 3000);
    };

    return (
        <Base>
            {loading && <LoadingComponent />}
            <Container>
                <Title>
                    <Font_Title>분석 결과</Font_Title>
                </Title>
                <WhiteBox1>
                    <Font_Body2>문장: {analysisResult.content}</Font_Body2>
                    <Font_Body2>난이도: {analysisResult.difficulty}</Font_Body2>
                    <Font_Body2>문법: {analysisResult.grammar}</Font_Body2>
                </WhiteBox1>
                <SaveBox>
                    <CustomButton onClick={handleSimilarSentenceRecommendation}>
                        유사 문장 추천받기
                    </CustomButton>
                </SaveBox>
                <SaveBox>
                    <Link to={`/studydetail/${analysisResult.content}&${sentenceId}`}>
                        <CustomButton>학습 노트 저장하기</CustomButton>
                    </Link>
                </SaveBox>
                <SaveBox>
                    <Link to="/main">
                        <CustomButton2>분석 종료</CustomButton2>
                    </Link>
                </SaveBox>
            </Container>
        </Base>
    );
};

export default Analyze;
