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
const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
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
    text-align: center; /* 가운데 정렬 */
    font-size: 14px;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
`;

const SearchButton = styled(Button)`
    padding: 10px 20px;
    font-size: 16px;
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

function createData(No, name, ID) {
    return { No, name, ID };
}

const initialRows = [
 
];

const Memberinfoadmin = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [rows, setRows] = useState(initialRows);

    useEffect(() => {
        console.log("Component mounted");
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filteredRows = initialRows.filter(row =>
            row.name.includes(searchTerm)
        );
        setRows(filteredRows);
    };

    const handleWithdraw = (ID) => {
        // 사용자 탈퇴 작업 수행
        Swal.fire({
            title: "정말 탈퇴하시겠습니까?",
            text: "탈퇴 후에는 복구할 수 없습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Withdraw confirmed for user ID: ${ID}`);
                withdrawUser(ID);
            } else {
                console.log(`Withdraw canceled for user ID: ${ID}`);
            }
        });
    };
    const withdrawUser = async (userID) => {
        try {
            const response = await TokenAxios.delete(`${API_BASE_URL}/v1/admin/users/${userID}/delete`);
            if (response.isSuccess) {
                // 성공적으로 삭제됨을 알리는 메시지를 표시하거나 다른 작업 수행
                Swal.fire("탈퇴 성공", "사용자가 성공적으로 탈퇴되었습니다.", "success");
            } else {
                // 실패 시 메시지 표시
                Swal.fire("탈퇴 실패", "사용자 탈퇴 중 오류가 발생했습니다.", "error");
            }
        } catch (error) {
            console.error("Error withdrawing user:", error);
            // 탈퇴 중 오류가 발생한 경우에 대한 에러 처리
            Swal.fire("탈퇴 실패", "사용자 탈퇴 중 오류가 발생했습니다.", "error");
        }
    };

    return (
        <PageContainer>
            <SearchContainer>
                <SearchInput 
                    type="text" 
                    placeholder="회원명을 입력하세요" 
                    value={searchTerm} 
                    onChange={handleInputChange} 
                />
                <Button onClick={handleSearch}>검색</Button>
            </SearchContainer>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Withdraw</StyledTableCell> {/* 새로운 열 */}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <StyledTableCell>{row.No}</StyledTableCell>
                                <StyledTableCell>
                                    <Link to={`/memberadmin?userID=${row.ID}`}>
                                        {row.name}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell>{row.ID}</StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => handleWithdraw(row.ID)}>탈퇴</Button>
                                </StyledTableCell>
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

export default Memberinfoadmin;
