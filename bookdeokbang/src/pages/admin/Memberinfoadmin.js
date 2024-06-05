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
import Pagination from '@mui/material/Pagination';
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
    margin-top: 10px;
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
    text-align: left;
    font-size: 14px;
`;
const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Memberinfoadmin = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [memberInfo, setMemberInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState(null); 
    const rowsPerPage = 8;

    const fetchMemberInfo = async () => {
        try {
            const response = await TokenAxios.get(`${API_BASE_URL}/v1/admin/users`);
            if (response.data && response.data.result) {
                setMemberInfo(response.data.result);
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("Error fetching member info:", error);
            Swal.fire("오류", "회원 정보를 가져오는 도중 오류가 발생했습니다.", "error");
        }
    };

    useEffect(() => {
        fetchMemberInfo();
    }, []);


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleWithdrawalButtonClick = async (userId) => {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        try {
            await TokenAxios.delete(`${API_BASE_URL}/v1/admin/users/${userId}/delete`);
            // 탈퇴 성공 후 회원 정보 다시 가져오기
            fetchMemberInfo();
        } catch (error) {
            console.error("탈퇴 요청 에러:", error);
        }
    };
    
    

    // 현재 페이지의 데이터 필터링
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = memberInfo.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <PageContainer>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell>회원 이름</StyledTableCell>
                            <StyledTableCell>전화번호</StyledTableCell>
                            <StyledTableCell>직업</StyledTableCell>
                            <StyledTableCell>탈퇴하기</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                    {currentRows.map((member, index) => (
                <tr key={index}>
                    <StyledTableCell>{member.name || "N/A"}</StyledTableCell>
                    <StyledTableCell>{member.phoneNum || "N/A"}</StyledTableCell>
                    <StyledTableCell>{member.social || "N/A"}</StyledTableCell>
                    <StyledTableCell>
                        <Button onClick={() => handleWithdrawalButtonClick(member.userId)}>탈퇴하기</Button>
                    </StyledTableCell> 
                </tr>
            ))}

                    </tbody>
                </StyledTable>
                <PaginationContainer>
                    <Pagination
                        count={Math.ceil(memberInfo.length / rowsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                        variant="outlined"
                        color="standard"
                    />
                </PaginationContainer>
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
                        size="lg">AI</MenuButton>
                    <Menu
                        variant="plain"
                    >
                        <Link to="/aiadmin">
                            <MenuItem color="neutral">모델 정보 및 관리</MenuItem>
                        </Link>
                        <Link to="/dataadmin">
                <MenuItem color="neutral">데이터 관리</MenuItem>
            </Link>
                    </Menu>
                </Dropdown>
            </DropdownGroup>
            <Button onClick={() => window.history.back()}>돌아가기</Button>
        </PageContainer>
    );
};

export default Memberinfoadmin;
