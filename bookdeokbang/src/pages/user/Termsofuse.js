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
    height: 600px;
    background-color: #F0F0F0;
    margin-top: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 0.8px solid ${theme.colors.black};
    display: flex;
    justify-content: center;
    align-items: center;
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
    text-align: leftr;
    font-family: 'Logo';
    line-height: 1.5;
`;

const Terms = () => {
    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>이용약관</Font_Title>
                </Title>
                <ContentBox>
                    <Font_Body>
                        제1조(목적) 이 약관은 북덕방(이하 "회사")가 제공하는 Gramary 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.<br/><br/>
                        제2조(정의)<br/>
                        "웹"이란 회사가 운영하는 웹 애플리케이션 Gramary를 의미합니다.<br/>
                        "이용자"란 웹에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br/><br/>
                        제3조(서비스의 제공 및 변경)<br/>
                        회사는 서비스의 내용을 추가하거나 변경할 수 있으며, 이 경우 변경된 서비스의 내용 및 제공일자를 명시하여 웹에 공지합니다.<br/><br/>
                        제4조(회원가입 및 탈퇴)<br/>
                        이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 회원가입을 신청합니다.<br/>
                        회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.<br/><br/>
                        제5조(개인정보 보호)<br/>
                        회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고, 이를 준수합니다.<br/><br/>
                        제6조(회사의 의무)<br/>
                        회사는 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.<br/><br/>
                        제7조(이용자의 의무)<br/>
                        이용자는 다음 행위를 하여서는 안 됩니다.<br/>
                        타인의 정보 도용<br/>
                        회사의 저작권 및 기타 권리 침해<br/>
                        공공질서 및 미풍양속에 반하는 행위<br/><br/>
                        제8조(분쟁 해결)<br/>
                        회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위해 최선을 다합니다.<br/><br/>
                        제9조(준거법 및 재판관할)<br/>
                        이 약관과 관련된 분쟁은 대한민국 법률을 준거법으로 하며, 분쟁에 관한 소송은 회사의 본사 소재지를 관할하는 법원에 제기합니다.<br/><br/>
                        이 약관은 2024년 6월 7일부터 적용됩니다.
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

export default Terms;
