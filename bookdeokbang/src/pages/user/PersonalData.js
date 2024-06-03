import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

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
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentBox = styled.div`
    width: 100%;
    max-width: 900px;
    height: 500px;
    background-color: #F0F0F0;
    margin-top: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 0.8px solid ${theme.colors.black};
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto; /* 내용을 스크롤 가능하게 합니다. */
`;

const CustomButton = styled(Button)`
    background-color: #000000;
    color: #ffffff;
    &:hover {
        background-color: #333333;
    }
    font-family: Logo;
    width: 150px;
    height: 50px;
    font-size: 18px;
    align-self: center;
    margin-top: 20px;
`;

const Title = styled.div`
    margin-bottom: 1vh;
    margin-top: 30px;
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    text-align: center;
`;

const Font_Body = styled.div`
    font-size: 12px;
    text-align: left;
    font-family: 'Logo';
    line-height: 1.5;
    margin-bottom: 15px;
`;

const PersonalData = () => {
    return (
    <Base>
        <Container>
             <Title>
                <Font_Title>개인정보 처리 방침</Font_Title>
            </Title>
            <ContentBox> 
                <Font_Body>
                    제1조(목적)<br/>
                    이 개인정보 처리 방침은 북덕방(이하 "회사")가 제공하는 Gramary 서비스(이하 "서비스") 이용자의 개인정보를 보호하기 위해 수립되었습니다.<br/><br/>

                    제2조(수집하는 개인정보의 항목)<br/>
                    회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.<br/>
                    - 회원가입 시: 이름, 이메일 주소, 비밀번호<br/>
                    - 서비스 이용 시: IP 주소, 쿠키, 방문 기록<br/><br/>

                    제3조(개인정보의 수집 및 이용 목적)<br/>
                    회사는 수집한 개인정보를 다음의 목적을 위해 사용합니다.<br/>
                    - 서비스 제공 및 운영<br/>
                    - 회원 관리<br/>
                    - 서비스 개선 및 신규 서비스 개발<br/><br/>

                    제4조(개인정보의 보유 및 이용 기간)<br/>
                    이용자의 개인정보는 회원 탈퇴 시까지 보유 및 이용되며, 탈퇴 후에는 지체 없이 파기됩니다.<br/><br/>

                    제5조(개인정보의 제3자 제공)<br/>
                    회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.<br/><br/>

                    제6조(이용자의 권리)<br/>
                    이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 회원 탈퇴를 통해 개인정보의 삭제를 요청할 수 있습니다.<br/><br/>

                    제7조(개인정보의 보호)<br/>
                    회사는 이용자의 개인정보를 보호하기 위해 관리적, 기술적, 물리적 조치를 취합니다.<br/><br/>

                    이 개인정보 처리 방침은 2024년 6월 7일부터 적용됩니다.
                </Font_Body>
            </ContentBox> 
            <Link to="/question">
                <CustomButton>
                    돌아가기
                </CustomButton>
            </Link>
        </Container>
    </Base>
    );
}

export default PersonalData;
