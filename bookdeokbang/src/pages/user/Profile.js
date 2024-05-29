import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-bottom: 120px; /* 위쪽 여백 설정 */
    align-items: center;
    background-color: ${theme.colors.white};
`;
const Container = styled.div`
    width: 100%;
    margin-top: 0px;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    justify-content: center; /* 수직 가운데 정렬 */
    align-items: center; /* 수평 가운데 정렬 */
`;

const ProfileBox = styled.div`
    width: 80px;
    height: 80px;
    background-color: #F0F0F0;
    margin-top: 20px; /* 위쪽 여백 */
    margin-bottom: 20px; /* 아래쪽 여백 */
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const InputBox = styled.div`
    width: 100%; /* 최대 너비 설정 */
    height: 50px; /* 고정 높이값 */
    background-color: #fff;
    margin-bottom: 20px; /* 틈을 주기 위한 마진 */
    border-radius: 8px; /* 둥근 모서리 추가 */
    border: 1px solid ${theme.colors.black}; /* 테두리 추가 */
    box-sizing: border-box; /* 테두리를 포함한 전체 크기를 유지하도록 설정 */
    display: flex;
    align-items: center; /* 텍스트를 수직 정렬하기 위해 추가 */
    justify-content: center; /* 텍스트를 수평 정렬하기 위해 추가 */
    font-size: 16px; /* 고정된 글꼴 크기 설정 */
    padding: 0 10px; /* 내부 패딩 추가 */
`;


const Button = styled.button`
    width: 100%;
    height: 50px;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: ${theme.colors.black};
    }
`;

const Title=styled.div`
    margin-bottom:1vh;
`;
const Body = styled.div`
    width: 100%; /* 최대 너비 설정 */
`;
const Bottom=styled.div`
    height: 100px; /* 고정 높이값 */
    width: 100%; /* 최대 너비 설정 */
`;

const Font_Title = styled.h1`
    font-size: 25px;
    font-family: 'Logo';
    margin: auto; /* 수평 가운데 정렬 */
    text-align:center;
`;
const Font_Red = styled.h1`
    font-size: 15px;
    font-family: 'Logo';
    margin: auto; /* 수평 가운데 정렬 */
    text-align:center;
    color:#BB0707;
`;
const Font_Body = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    text-align: left;
`;
const Font_Content = styled.h1`
    font-size: 13px;
    font-family: 'Logo';
    text-align: left;
`;


const Profile = () => {
    return (
        <Base>
        <Container>
            <Title>
                <Font_Title>내 프로필</Font_Title>
                <Font_Title></Font_Title>
            </Title>
       
           
            <Body>
            <Title>
                <Font_Content>닉네임</Font_Content>
                <InputBox type="text" /> {/* text type의 input 상자 */}
             
                
            </Title>
            </Body>
            <Bottom>
                <Font_Content>이메일</Font_Content>
                <InputBox type="email" /> {/* email type의 input 상자 */}
            </Bottom>
            <Link to="/mypage">
            <Button>돌아가기</Button> 
</Link>
          
        </Container>
    </Base>
    );
}


export default Profile;