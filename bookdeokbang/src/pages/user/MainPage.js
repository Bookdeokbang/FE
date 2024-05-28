import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { useNavigate } from 'react-router-dom';
import SvgIcon from "@mui/material/SvgIcon";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ContactsIcon from '@mui/icons-material/ImportContacts';
import { Link } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

const Container_Head = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const WhiteBox1 = styled.div`
    width: 100%;
    height: 110px;
    background-color: #fff;
    margin-bottom: 15px;
    border-radius: 8px;
`;

const Spacer = styled.div`
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
`;

const WhiteBox2 = styled.div`
    width: 100%;
    height: 120px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 8px;
`;

const GrayBox = styled.div`
    width: 100%;
    height: 100px;
    background-color: #ccc;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    border-radius: 8px;

`;

const InstructionText = styled.h3`
    font-size: 16px;
    font-family: 'Logo';
    margin: 0;
`;

const SmallWhiteBox = styled.div`
    width: 80px;
    height: 80px;
    background-color: #fff;
    margin-right: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const SmallBlackBox = styled.div`
    width: 80px;
    height: 80px;
    background-color: #000;
    margin-right: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
`;

const MenuItem = styled.h2`
    font-size: 15px;
    font-family: 'Logo';
    margin: 0;
    text-align: right;
    width: fit-content;
    padding: 5px;
    margin-left: auto;
`;

const Title = styled.h2`
    font-size: 40px;
    font-family: 'engLogo';
    margin: 0;
    text-align: left;
`;

const Info = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    text-align: center;
`;

const Info2 = styled.h1`
    font-size: 15px;
    font-family: 'Logo';
    text-align: center;
`;

const Voca = styled.h1`
    font-size: 24px;
    font-family: 'engLogo';
    text-align: right;
    margin: 0;
`;

const MainPage = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    
    const { handleSubmit } = useForm();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [words, setWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleGalleryImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            handleSubmit(() => handleImageSubmit(file))();
        };
        input.click();
    };
    const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file); // 파일을 배열 버퍼로 읽음
        });
    };
    const handleImageSubmit = async (file) => {
        try {
            const formData = new FormData();
            formData.append('type', 'SENTENCE');
            formData.append('file', file); 
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
    
            const res = await TokenAxios.post(`${API_BASE_URL}/v1/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'json'
            }); 

            console.log('Response:', res);
    
            if (res.data ) {
                const sentenceId = res.data.result;
                console.log('sentence ID: ', sentenceId);
                navigate(`/analyze/${sentenceId}`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchWords = async () => {
        try {
            const response = await TokenAxios.get(`${API_BASE_URL}/v1/words/all`);
            console.log(response.data.result); // API 응답 데이터 확인
            const wordsData = response.data.result;
            setWords(wordsData);
            const shuffledWords = wordsData.sort(() => 0.5 - Math.random());
            setSelectedWords(shuffledWords.slice(0, 3));
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    };

   

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await TokenAxios.get(`${API_BASE_URL}/v1/notices/all`);
                setNotices(res.data.result);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };
        fetchNotices();
    }, [API_BASE_URL]);

    const handleNoticeClick = async (noticeId) => {
        try {
            const res = await TokenAxios.get(`${API_BASE_URL}/v1/notices/${noticeId}`);
            setSelectedNotice(res.data.result);
            handleModalOpen(res.data.result);
        } catch (error) {
            console.error("공지사항 detail 가져오기 실패:", error);
        }
    };

    const handleModalOpen = (notice) => {
        MySwal.fire({
            title: <strong>{notice.title}</strong>,
            html: (
                <div>
                    <p><strong>Category:</strong> {notice.category}</p>
                    <p><strong>Content:</strong> {notice.content}</p>
                    <p><strong>Updated At:</strong> {notice.updated_at}</p>
                </div>
            ),
            showCloseButton: true,
        });
    };



    useEffect(() => {
        fetchWords();
    }, []);

    const handleContactsClick = () => {
        navigate('/studynote');
    };

    return (
        <Base>
         <form onSubmit={handleSubmit(handleImageSubmit)}>
            <Container>
                <Container_Head>
                    <Title>Gramary</Title>
                    <Menu>
                        <MenuItem>
                            <Link to="/mypage">마이페이지</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/info">공지사항</Link>
                        </MenuItem>
                    </Menu>
                </Container_Head>

                <WhiteBox1>
                    {notices.slice(0, 3).map((notice, index) => (
                        <Info key={index} onClick={() => handleNoticeClick(notice.noticeId)}>
                            {notice.title}
                        </Info>
                    ))}
                </WhiteBox1>

                <Spacer>
                    <Voca>Today's Vocabulary</Voca>
                </Spacer>
                <WhiteBox2>
                    {selectedWords.map((word, index) => (
                        <Info key={index}>{word.name}: {word.meaning}</Info>
                    ))}
                </WhiteBox2>
                
                <GrayBox>
                    <SmallWhiteBox onClick={handleGalleryImage}>
                        <SvgIcon component={CameraAltIcon} fontSize="large" />
                    </SmallWhiteBox>
                    <Info2>모르는 영어 문장을 검색해보세요</Info2>
                    </GrayBox>
                
                <GrayBox>
                    <SmallWhiteBox onClick={handleContactsClick}>
                        <SvgIcon component={ContactsIcon} fontSize="large" />
                    </SmallWhiteBox>
                    <Info2>나만의 영어 문장을 기록해보세요</Info2>
                </GrayBox>
            </Container>
            </form>
        </Base>
    );
};

export default MainPage;