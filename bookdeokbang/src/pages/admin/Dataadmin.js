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
import Papa from 'papaparse'; // papaparse 라이브러리 import

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
    color: #000; /* 검정색으로 설정 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경하여 클릭 가능한 것임을 표시합니다. */
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
    margin: 20px auto; /* 수정: 좌우 마진을 auto로 설정하여 수평 가운데 정렬 */
    overflow-x: auto;
    display: flex; /* 추가: 플렉스 컨테이너로 설정 */
    justify-content: center; /* 추가: 가운데 정렬 */
`;

const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
`;

const StyledTable = styled(Table)`
    width: 50%; /* 수정: AI 관리 표의 너비 조정 */
    border-collapse: collapse;
`;

const StyledTableCell = styled.td`
    padding: 8px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 14px;
    width: auto; /* 수정: 셀 너비 자동 조정 */
`;

const FileInput = styled.input`
    display: none; /* 실제로는 보이지 않도록 설정 */
`;

const FileInputLabel = styled.label`
    padding: 10px 20px;
    background-color: ${theme.colors.primary};
    color: black;
    border-radius: 4px;
    cursor: pointer;
`;
const DataButton = styled(Button)`
    padding: 10px 20px !important;
    font-family: logo !important;
    font-size: 16px !important;
    background-color: ${theme.colors.primary} !important;
    color: black !important;
    border-radius: 4px !important;
    cursor: pointer !important;
`;

const Dataadmin = () => {
    const API_BASE_URL = "http://34.64.139.6:8000";
    const [fileNames, setFileNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TokenAxios.get(`${API_BASE_URL}/files`);
                // 파일 이름만 추출
                const parsedData = response.data.csv_files;
                setFileNames(parsedData);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchData(); 
    }, [fileNames]); 

    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // 선택된 파일
        try {
            const formData = new FormData();
            formData.append("file", file); // 파일을 FormData에 추가
    
            // 서버로 파일 전송
            const response = await TokenAxios.post(`${API_BASE_URL}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            // 파일 전송 후 처리할 작업 추가
            // 업로드 성공한 파일명을 fileNames 상태에 추가
            setFileNames([...fileNames, response.data.fileName]);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    

    return (
        <PageContainer>
            {/* 파일 등록 UI */}
            <FileInputLabel htmlFor="file">
            파일 선택
            </FileInputLabel>
            <FileInput type="file" id="file" onChange={handleFileChange} />
            
            {/* 나머지 UI */}
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell colSpan={2}>Data 관리</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 파일명만 렌더링 */}
                        {fileNames.length > 0 ? (
                            fileNames.map((fileName, index) => (
                                <tr key={index}>
                                    <StyledTableCell colSpan={2}>{fileName}</StyledTableCell> {/* 수정: colSpan 추가 */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <StyledTableCell colSpan={2}>
                                    {fileNames.length === 0 ? "데이터를 불러오는 중입니다..." : "데이터가 없습니다."}
                                </StyledTableCell>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </TableContainer>
            
            {/* 기타 UI */}
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
                    <StyledLink to="/modifyadmin">
                        <Button>관리자 정보 수정</Button>
                    </StyledLink>
                    <StyledLink to="/">
                        <Button>로그아웃</Button>
                    </StyledLink>
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
                        variant="plain" >
                        <Link to="/aiadmin">
                            <MenuItem color="neutral">모델 정보 및 관리</MenuItem>
                        </Link>
                        
                    </Menu>
                </Dropdown>
            </DropdownGroup>
        </PageContainer>
    );
}

export default Dataadmin;
