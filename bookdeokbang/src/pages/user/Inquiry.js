import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Button } from "@mui/material";
import Swal from 'sweetalert2';
import { TokenAxios } from '../../apis/CommonAxios';

const CustomButton = styled(Button)`
    background-color: #00000;
    color: #000000;
    &:hover {
        background-color: #11111;
    }
    width: 150px;
    height: 50px;
    font-size: 20px;
    align-self: center;
`;

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

const Memo = styled.textarea`
    width: 100%;
    height: 480px;
    background-color: #fff;
    margin-top: 20px;
    margin-bottom: 30px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    resize: vertical;
    &::placeholder {
        color: #a9a9a9;
    }
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto;
    text-align: center;
`;

const Bottom = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -60px;
`;

const Inquiry = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [memoContent, setMemoContent] = useState('');

    const handleInquiry = async () => {
        const userId = localStorage.getItem("userId");  // 사용자 ID 가져오기
        const requestTimestamp = new Date().toISOString();

        try {
            const payload = {
                user: userId,
                request: memoContent,
                request_timestamp: requestTimestamp,
            };
            console.log("Request Payload:", payload);  // 요청 데이터 확인 로그
    
            const res = await TokenAxios.post(`${API_BASE_URL}/v1/inquiries`, payload);
    
            console.log("Response Data:", res.data);  // 응답 데이터 확인 로그
    
            if (res.data.isSuccess && res.data.result === "_OK") {
                Swal.fire("성공", "문의가 성공적으로 저장되었습니다.", "success");
                setMemoContent('');  // 저장 후 입력 내용 초기화
            } else {
                Swal.fire("오류", res.data.message || "문의 저장 중 오류가 발생했습니다.", "error");
            }
        } catch (error) {
            console.error("Error posting inquiry", error);
            Swal.fire("오류", "문의 저장 중 오류가 발생했습니다.", "error");
        }
    };

    return (
        <Base>
            <Container>
                <Font_Title>1:1 문의내역</Font_Title>
                <Memo 
                    placeholder="문의내역을 입력하세요" 
                    value={memoContent} 
                    onChange={(e) => setMemoContent(e.target.value)}
                />
                <Bottom>
                    <CustomButton onClick={handleInquiry}>
                        저장하기
                    </CustomButton>
                </Bottom>
            </Container>
        </Base>
    );
};

export default Inquiry;
