import React from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Table from '@mui/joy/Table';
import { Link } from "react-router-dom"; 
import { TokenAxios } from "../../apis/CommonAxios";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'; // 아이콘 추가
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined'; // 두 번째 아이콘 추가
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined'; // 세 번째 아이콘 추가

const PageContainer = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;      
    background-color: ${theme.colors.beige};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const TopRightGroup = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    font-family: Logo;
`;

const Gramary = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 30px;
    font-family: englogo;
`;

const CenterGroup = styled.div`
    display: flex;
    align-items: center; /* 아이콘을 수직 가운데 정렬 */
`;

const StyledButtonGroup = styled(ButtonGroup)`
    background-color: transparent; // 배경색 투명
    border: 1px solid gray; // 테두리 색 회색
    margin-right: 30px; // 우측에 간격 설정
    display: flex;
    flex-direction: column;
    margin: 5px; /* 텍스트 주변의 마진 설정 */
    align-items: center; /* 아이콘을 수직 가운데 정렬 */
    height: 250px; /* 각 표의 높이 설정 */
    font-family: Logo;
`;

const StyledButton = styled(Button)`
    background-color: transparent !important; // 버튼 배경색 투명
    color: black !important; // 버튼 글자색 검정
    display: flex;
    flex-direction: column;
    justify-content: center; /* 내용을 수직 가운데 정렬 */
    align-items: center; /* 내용을 수평 가운데 정렬 */
    font-family: Logo;
`;
const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
`;
const NavigationButton = ({ to, icon, label }) => (
    <Link to={to}>
        <StyledButton>
            <IconWrapper>{icon}</IconWrapper>
            {label}
        </StyledButton>
    </Link>
);

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Mainadmin = () => {
    return (
        <PageContainer>
            <Gramary>Gramary</Gramary>
            <CenterGroup>
                {/* 첫 번째 표 */}
                <StyledButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                    orientation="vertical"
                >
                    <NavigationButton icon={<ManageAccountsOutlinedIcon />} label="USER" />
                    <NavigationButton to="/memberinfoadmin" label="사용자 정보 관리" />
                </StyledButtonGroup>

                {/* 두 번째 표 */}
                <StyledButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                    orientation="vertical"
                >
                    <NavigationButton icon={<FolderCopyOutlinedIcon />} label="DATA" />
                    <NavigationButton to="/askadmin" label="문의 관리" />
                    <NavigationButton to="/saveadmin" label="문장 관리" />
                    <NavigationButton to="/wordadmin" label="단어 관리" />
                    <NavigationButton to="/infoadmin" label="공지사항 관리" />
                </StyledButtonGroup>

                {/* 세 번째 표 */}
                <StyledButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                    orientation="vertical"
                >
                    <NavigationButton icon={<DeveloperBoardOutlinedIcon />} label="AI" />
                    <NavigationButton to="/aiadmin" label="모델 정보 및 관리" />
                </StyledButtonGroup>
            </CenterGroup>

            <TopRightGroup>
                <ButtonGroup
                    color="neutral"
                    orientation="horizontal"
                    size="lg"
                    spacing={0}
                    variant="soft"
                >
                    <StyledLink to="/modifyadmin">
                        <Button>관리자 정보 수정</Button>
                    </StyledLink>
                    <StyledLink to="/">
                        <Button>로그아웃</Button>
                    </StyledLink>
                </ButtonGroup>
            </TopRightGroup>
        </PageContainer>
    );
}
export default Mainadmin;
