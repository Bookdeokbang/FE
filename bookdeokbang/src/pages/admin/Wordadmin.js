import React, { useState, useEffect } from "react";
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

const DropdownGroup = styled.div`
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
    margin-top: 10px; /* 각 Dropdown 사이의 간격을 조절합니다. */
`;

const TableContainer = styled.div`
    width: 80%;
    margin: 20px;
    overflow-x: auto;
`;

const StyledTable = styled(Table)`
    width: 100%;
    border-collapse: collapse;
`;

const StyledTableCell = styled.td`
    padding: 8px;
    border: 1px solid #dddddd;
    text-align: left;
    font-size: 14px;
`;

const Wordadmin = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
                const response = await TokenAxios.get(`${API_BASE_URL}/v1/admin/words/all`);
                console.log(response.data);
                setRows(response.data); // API 응답 데이터로 테이블 행 설정
            } catch (error) {
                console.error("Error fetching data:", error);
                // 데이터 가져오기에 실패한 경우 에러 처리
            }
        }

        fetchData();
    }, []);

    return (
        <PageContainer>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell>등록 날짜</StyledTableCell>
                            <StyledTableCell>단어</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <StyledTableCell>{row.Date}</StyledTableCell>
                                <StyledTableCell>{row.sentence}</StyledTableCell>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>
            <Link to="/mainadmin">
                <Gramary>Gramary</Gramary>
            </Link>
        
            <TopRightGroup>
                <ButtonGroup
                    color="neutral"
                    orientation="horizontal"
                    size="lg"
                    spacing={0}
                    variant="soft"
                >
                     <Link to="/modifyadmin">
                        <Button>관리자 정보 수정</Button>
                    </Link>
                    <Link to="/">
                        <Button>로그아웃</Button>
                    </Link>
                </ButtonGroup>
            </TopRightGroup>
            <DropdownGroup>
    <Dropdown>
        <MenuButton
            variant="plain"
            color="neutral"
            size="lg">USER</MenuButton>
        <Menu
            variant="plain"
        >
            <Link to="/memberinfoadmin">
                <MenuItem color="neutral">사용자 정보 관리</MenuItem> 
            </Link>
        </Menu>
    </Dropdown>
    <Dropdown>
        <MenuButton
            variant="plain"
            color="neutral"
        >DATA</MenuButton>
        <Menu>
            <Link to="/askadmin">
                <MenuItem color="neutral">문의 관리</MenuItem> 
            </Link>
            <Link to="/saveadmin">
                <MenuItem color="neutral">문장 관리</MenuItem> 
            </Link>
            <Link to="/wordadmin">
                <MenuItem color="neutral">단어 관리</MenuItem>
            </Link>
            <Link to="/infoadmin">
                <MenuItem color="neutral">공지사항 관리</MenuItem>
            </Link>
        </Menu>
    </Dropdown>
    <Dropdown>
        <MenuButton
            variant="plain"
            color="neutral"
            size="lg">AI
        </MenuButton>
        <Menu
            variant="plain"
        >
            <Link to="/aiadmin">
                <MenuItem color="neutral">모델 정보 및 관리</MenuItem>
            </Link>
        </Menu>
    </Dropdown>
</DropdownGroup>

        </PageContainer>
    );
}
export default Wordadmin;
