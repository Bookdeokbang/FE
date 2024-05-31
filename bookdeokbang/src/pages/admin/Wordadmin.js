import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Table from '@mui/joy/Table';
import { Link } from "react-router-dom"; 
import Swal from 'sweetalert2';
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
    color: #000; /* 검정색으로 설정 */
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

const AddWordButton = styled(Button)`
    padding: 10px 20px !important;
    font-family: logo !important;
    font-size: 16px !important;
    background-color: ${theme.colors.primary} !important;
    color: black !important;
    border-radius: 4px !important;
    cursor: pointer !important;
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
    text-align: center; /* 가운데 정렬 추가 */
    font-size: 14px;
`;
const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
`;

const Wordadmin = () => {
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const fetchData = async () => {
        try {
            const response = await TokenAxios.get(`${API_BASE_URL}/v1/admin/words/all`);
            setRows(response.data.result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [rows]);

  
    const handleAddWord = async () => {
        Swal.fire({
            title: '단어 등록',
            html:
                `<input id="name" class="swal2-input" placeholder="단어"/>
                 <input id="meaning" class="swal2-input" placeholder="의미"></input>`,
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const meaning = document.getElementById('meaning').value;
                if (!name || !meaning) {
                    Swal.showValidationMessage('단어와 의미를 모두 입력해주세요.');
                }
                return { name, meaning };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { name, meaning } = result.value;
                try {
                    const data = [{ name, meaning }]; // 수정된 부분: 데이터를 배열 형태로 감싸서 전송
                    const res = await TokenAxios.post(`${API_BASE_URL}/v1/admin/words`, data);
                    if (res.data.result === "_OK") {
                        Swal.fire("단어가 등록되었습니다!", "", "success");
                        fetchData(); // 데이터 다시 불러오기
                    }
                } catch (error) {
                    console.error("Error adding word:", error);
                    Swal.fire("등록 실패", "오류가 발생했습니다.", "error");
                }
            } else {
                Swal.fire("단어 등록이 취소되었습니다.", "", "error");
            }
        });
    };
    
    
    
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleWordSubmit = async (name, meaning) => {
        try {
            const data = { name: '', meaning: '' };
            const res = await TokenAxios.post(`${API_BASE_URL}/v1/admin/words`, data);
            if (res.data.result === "_OK") {
                Swal.fire("단어가 등록되었습니다!", "", "success");
            }
        } catch (error) {
            console.error("Error adding word:", error);
            Swal.fire("등록 실패", "오류가 발생했습니다.", "error");
        }
    };
    
    const displayedRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <PageContainer>
            <AddWordButton onClick={handleAddWord}>단어 등록하기</AddWordButton>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell>단어</StyledTableCell>
                            <StyledTableCell>뜻</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                         {displayedRows.map((row, index) => (
                              <tr key={index}>
                             <StyledTableCell>{row.name}</StyledTableCell>
                            <StyledTableCell>{row.meaning}</StyledTableCell>
                             </tr>
    ))}
</tbody>
                </StyledTable>
            </TableContainer>
            <Pagination
                count={Math.ceil(rows.length / rowsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
            />
            <Link to="/mainadmin">
                <Gramary>Gramary</Gramary>
            </Link>
            <TopRightGroup>
                <ButtonGroup
                    color="neutral"
                    orientation="horizontal"
                    size="large"
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
                    <MenuButton variant="plain" color="neutral" size="large">USER</MenuButton>
                    <Menu variant="plain">
                        <Link to="/memberinfoadmin">
                            <MenuItem color="neutral">사용자 정보 관리</MenuItem>
                        </Link>
                    </Menu>
                </Dropdown>
                <Dropdown>
                    <MenuButton variant="plain" color="neutral">DATA</MenuButton>
                    <Menu>
                        <Link to="/askadmin">
                            <MenuItem color="neutral">문의 내역 관리</MenuItem>
                        </Link>
                        <Link to="/saveadmin">
                            <MenuItem color="neutral">문장 데이터 관리</MenuItem>
                        </Link>
                        <Link to="/wordadmin">
                            <MenuItem color="neutral">단어 데이터 관리</MenuItem>
                        </Link>
                        <Link to="/infoadmin">
                            <MenuItem color="neutral">공지사항 관리</MenuItem>
                        </Link>
                    </Menu>
                </Dropdown>
                <Dropdown>
                    <MenuButton variant="plain" color="neutral" size="large">AI</MenuButton>
                    <Menu variant="plain">

                        <Link to="/aiadmin">
                            <MenuItem color="neutral">모델 정보 및 관리</MenuItem>
                        </Link>
                    </Menu>
                </Dropdown>
            </DropdownGroup>
        </PageContainer>
    );
};

export default Wordadmin;
