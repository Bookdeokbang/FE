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
    height: auto;
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

const Policy = () => {
    return (
    <Base>
        <Container>
            <Title>
                <Font_Title>운영정책</Font_Title>
            </Title>
            <ContentBox>
                <Font_Body>
                    제1조(목적)<br/>
                    이 운영정책은 북덕방(이하 "회사")가 제공하는 Gramary 서비스(이하 "서비스")의 운영 기준 및 이용자의 준수 사항을 규정함을 목적으로 합니다.<br/><br/>

                    제2조(서비스 이용시간)<br/>
                    서비스는 연중무휴 24시간 제공함을 원칙으로 합니다. 다만, 시스템 점검 등 회사가 필요하다고 인정하는 경우 서비스 제공이 일시 중지될 수 있습니다.<br/><br/>

                    제3조(이용자의 책임)<br/>
                    이용자는 서비스 이용 시 이 운영정책 및 관계 법령을 준수하여야 합니다. 타인의 권리나 명예를 침해하는 행위를 해서는 안 됩니다.<br/><br/>

                    제4조(서비스 이용 제한)<br/>
                    회사는 이용자가 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.<br/>
                    - 법령 또는 이 운영정책을 위반하는 경우<br/>
                    - 타인의 권리나 명예를 침해하는 경우<br/>
                    - 공공질서 및 미풍양속에 반하는 행위를 하는 경우<br/><br/>

                    제5조(서비스 중단)<br/>
                    회사는 천재지변, 전쟁, 서비스 설비의 장애, 이용 폭주 등 불가항력적인 사유가 발생한 경우 서비스 제공을 일시적으로 중단할 수 있습니다.<br/><br/>

                    이 운영정책은 2024년 6월 7일부터 적용됩니다.
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

export default Policy;
