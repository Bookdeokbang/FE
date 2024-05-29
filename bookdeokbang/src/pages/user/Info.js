import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

const TitleBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: #F0F0F0;
    margin-top: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.8px solid ${theme.colors.black};
`;
const CustomButton = styled(Button)`
    background-color: #00000;
    color: #000000;
    &:hover {
        background-color: #11111;
    }
    font-family: Logo;
    width: 150px;
    height: 50px;
    font-size: 20px;
    align-self: center;
`;

const Title = styled.div`
    margin-bottom: 7vh;
    margin-top: 10px;
`;
const Body = styled.div`
    width: 100%;
`;
const Bottom = styled.div`
    height: 200px;
    width: 100%;
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto;
    text-align: center;
`;

const Font_Body = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    text-align: left;
`;
const Font_Content = styled.h1`
    font-size: 15px;
    font-family: 'Logo';
    text-align: left;
    color: black;
`;

const Info = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);

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

    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>공지사항</Font_Title>
                </Title>
                {notices.map((notice) => (
                    <TitleBox key={notice.noticeId} onClick={() => handleNoticeClick(notice.noticeId)}>
                        <Font_Content>
                            {notice.title}
                        </Font_Content>
                    </TitleBox>
                ))}
                <Link to="/main">
                    <CustomButton>돌아가기</CustomButton>
                </Link>
            </Container>
        </Base>
    );
};

export default Info;