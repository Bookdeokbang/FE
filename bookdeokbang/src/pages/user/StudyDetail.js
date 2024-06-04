import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { Link, useParams, useLocation } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

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
const WhiteBox1 = styled.div`
    width: 100%;
    height: 150px;
    background-color: #fff;
    margin-bottom: 15px;
    border-radius: 8px; /* 둥근 모서리 추가 */
    border: 1px solid ${theme.colors.black}; /* 테두리 추가 */
    box-sizing: border-box; /* 테두리를 포함한 전체 크기를 유지하도록 설정 */
`;

const Memo = styled.textarea`
    width: 100%;
    height: 300px;
    font-family: 'Logo';
    background-color: #fff;
    margin-bottom: 50px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    resize: vertical;
    &::placeholder { /* 힌트 텍스트 스타일링 */
        color: #a9a9a9;
    }
`;

const SaveBox = styled.div`
    width: 100%; /* 최대 너비 설정 */
    height: 50px; /* 고정 높이값 */
    background-color: #fff;
    margin-bottom: 15px; /* 틈을 주기 위한 마진 */
    border-radius: 8px; /* 둥근 모서리 추가 */
    border: 1px solid ${theme.colors.black}; /* 테두리 추가 */
    box-sizing: border-box; /* 테두리를 포함한 전체 크기를 유지하도록 설정 */
    display: flex;
    align-items: center; /* 텍스트를 수직 정렬하기 위해 추가 */
    justify-content: center; /* 텍스트를 수평 정렬하기 위해 추가 */
    font-size: 16px; /* 고정된 글꼴 크기 설정 */
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

const Title = styled.div`
    margin-bottom: 2vh;
`;

const Font_Title = styled.h1`
    font-size: 30px;
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

const StudyDetail = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { sentenceid } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const title = queryParams.get('title');
    const content = queryParams.get('content');
    const [noteItem, setNoteItem] = useState(null);
    const [memoContent, setMemoContent] = useState(content || '');
    const [isLoading, setIsLoading] = useState(true);
    const memoRef = useRef();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const all_res = await TokenAxios.get(`${API_BASE_URL}/v1/notes/all`);
                const all_response = all_res.data.result;
                const all_item = all_response.find(item => item.sentenceId == sentenceid);
                setNoteItem(all_item);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, [API_BASE_URL, sentenceid]);

    const saveStudyNote = async (item) => {
        const content = memoRef.current.value;
    
        try {
            await TokenAxios.patch(`${API_BASE_URL}/v1/notes/${item.id}/update`, {
                sentenceId: item.sentenceId,
                title: item.name,
                content: content
            });
    
            setNoteItem({
                ...item,
                content: content
            });
        } catch (e) {
            console.log('Patch request failed:', e);
        }
    };
    
    

    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>학습 노트</Font_Title>
                </Title>
                <WhiteBox1>
                    <Font_Body>
                        {isLoading ? (
                            "로딩 중..."
                        ) : (
                            noteItem ? (
                                noteItem.name
                            ) : (
                                title
                            )
                        )}
                    </Font_Body>
                </WhiteBox1>
                <Memo ref={memoRef} placeholder="메모를 입력하세요" defaultValue={memoContent} />
                <CustomButton onClick={() => saveStudyNote(noteItem)}>저장하기</CustomButton>

                <Link to="/main">
                    <CustomButton>
                        학습종료
                    </CustomButton>
                </Link>
            </Container>
        </Base>
    );
}

export default StudyDetail;
