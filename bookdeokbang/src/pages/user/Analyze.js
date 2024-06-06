import React, { useState, useEffect, useRef } from 'react';
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
    padding: 20px;
    overflow-y: auto; /* 내용을 스크롤 가능하게 합니다. */
`;


const SaveBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: transparent;
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
    background-color: transparent;
    color: #000;
    &:hover {
        background-color: transparent;
        color: #000;
    }
    font-family: 'Logo';
    width: 150px;
    height: 50px;
    font-size: 15px;
    align-self: center;
`;

const CustomButton2 = styled(Button)`
    background-color: #000;
    color: #ffffff;
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

const Font_Body1 = styled.h1`
    font-size: 16px;
    font-family: 'Logo';
    margin: 5px;
    text-align: center;
    letter-spacing: 12px; /* 띄어쓰기를 늘릴 크기 */
    white-space: pre-wrap;
    overflow-wrap: break-word; /* 크로스 브라우징을 위해 추가 */
`;

const Font_Body2 = styled.h1`
    font-size: 16px;
    font-family: 'Logo';
    margin: 5px;
    text-align: center;
`;

const Font_Body3 = styled.h1`
    font-size: 10px;
    font-family: 'Logo';
    margin-left: 30px;
    text-align: center;
    letter-spacing: 1px;
    span:not(:last-child) {
        margin-right: 5px;
    }
`;

const Analyze = () => {
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { sentenceId } = useParams();
    const [analysisResult, setAnalysisResult] = useState({});
    const [previousSentenceId, setPreviousSentenceId] = useState(null);
    const [grammar, setGrammar] = useState(null);
    const [posTags, setPosTags] = useState([]);
    const [difficulty, setDifficulty] = useState(null);
    const navigate = useNavigate();
    const words = analysisResult.content ? analysisResult.content.split(' ') : [];
    const whiteBoxRef = useRef(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!sentenceId || sentenceId === previousSentenceId) return;
            setLoading(true);
            try {
                const response = await TokenAxios.get(`${API_BASE_URL}/v1/sentences/${sentenceId}/info`);
                setAnalysisResult(response.data.result);
                setGrammar(response.data.result.grammar);
                setDifficulty(response.data.result.difficulty);
                setPosTags(response.data.result.info ? Object.values(response.data.result.info.posTags) : []); 
                setPreviousSentenceId(sentenceId);
                // 컨텐츠가 변경될 때마다 WhiteBox1의 높이를 조정
                if (whiteBoxRef.current) {
                    whiteBoxRef.current.style.height = `${whiteBoxRef.current.scrollHeight}px`;
                }
            } catch (error) {
                console.error("Error fetching analysis data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [sentenceId, previousSentenceId, API_BASE_URL]);
    useEffect(() => {
        if (whiteBoxRef.current) {
            // WhiteBox1의 높이를 내용에 맞게 조절
            whiteBoxRef.current.style.height = `${whiteBoxRef.current.scrollHeight}px`;
        }
    }, [analysisResult]);


    const fetchDataUntilUnique = async (grammar, difficulty) => {
        let isUnique = false;
        let data = [];
        
        while (!isUnique) {
          const res = await TokenAxios.get(`${API_BASE_URL}/v1/sentences/${grammar}/${difficulty}/3/recommend`);
          data = res.data.result;
      
          // content 값이 서로 다른지 검사
          const contents = data.map(item => item.content);
          isUnique = new Set(contents).size === contents.length;
        }
      
        return data;
    };

    const handleSimilarSentenceRecommendation = async() => {
        setLoading(true);
        setTimeout(async() => {
            const data = await fetchDataUntilUnique(grammar, difficulty);
            setLoading(false);
            navigate(`/similar/`, { state: data });
        }, 3000);
    };

    const handleStudytDetail = async () => {
            try {
                TokenAxios.post(`${API_BASE_URL}/v1/sentences/note`, {
                    sentenceId: sentenceId,
                    title: analysisResult.content, // Use dynamic title
                    content: analysisResult.grammar // Use dynamic content
                }, {
                });
                setLoading(true);
                setTimeout(() => {
                    navigate(`/studydetail/${sentenceId}?title=${encodeURIComponent(analysisResult.content)}&content=${encodeURIComponent(analysisResult.grammar)}`);
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
                    <Font_Title>분석 결과</Font_Title>
                </Title>
                <WhiteBox1 ref={whiteBoxRef}>
                <Font_Body1>{analysisResult.content}</Font_Body1>
                <Font_Body3>
    {posTags.map((tag, index) => (
        <span key={index}>{tag.split(',')[0].trim()}{index !== posTags.length - 1 && '/'}</span>
    ))}
</Font_Body3>

                    <Font_Body2>난이도: {analysisResult.difficulty}</Font_Body2>
                    <Font_Body2>문법: {analysisResult.grammar}</Font_Body2>
                </WhiteBox1>
                <SaveBox>
                    <CustomButton onClick={handleSimilarSentenceRecommendation}>
                        유사 문장 추천받기
                    </CustomButton>
                </SaveBox>
                <SaveBox>
                    <CustomButton onClick={handleStudytDetail}>학습 노트 저장하기</CustomButton>
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
