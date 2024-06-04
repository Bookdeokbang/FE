import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { Link, useNavigate } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import Pagination from '@mui/material/Pagination';

const MySwal = withReactContent(Swal);

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-bottom: 120px;
    align-items: center;
    background-color: ${theme.colors.beige};
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

const TitleBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.8px solid ${theme.colors.black};
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
    margin-bottom: 7vh;
    margin-top: 10px;
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto;
    text-align: center;
`;

const Font_Content = styled.h1`
    font-size: 15px;
    font-family: 'Logo';
    text-align: left;
    color: black;
`;

const StudyNote = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(7); // 페이지 당 행 수

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await TokenAxios.get(`${API_BASE_URL}/v1/notes/all`);
                setNotes(res.data.result);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    }, [API_BASE_URL]);

    const handleNoteClick = async (noteId) => {
        try {
            const res = await TokenAxios.get(`${API_BASE_URL}/v1/notes/${noteId}`);
            const note = res.data.result;
            MySwal.fire({
                title: <strong>{note.name}</strong>,
                html: (
                    <div>
                        <p><strong>Title:</strong> {note.name}</p>
                        <p><strong>Content:</strong> {note.content}</p>
                    </div>
                ),
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: '수정하기',
                cancelButtonText: '닫기'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/studydetail/${note.sentenceId}?title=${note.name}&content=${note.content}`);
                }
            });
        } catch (error) {
            console.error("노트 detail 가져오기 실패:", error);
        }
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = notes.slice(indexOfFirstRow, indexOfLastRow);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>학습노트</Font_Title>
                </Title>
                {currentRows.map((notes) => (
                    <TitleBox key={notes.id} onClick={() => handleNoteClick(notes.id)}>
                        <Font_Content>
                            {notes.name}
                        </Font_Content>
                    </TitleBox>
                ))}
                <Link to="/main">
                    <CustomButton>돌아가기</CustomButton>
                </Link>
                <Pagination
                    count={Math.ceil(notes.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    shape="rounded"
                    variant="outlined"
                />
            </Container>
        </Base>
    );
};

export default StudyNote;
