import React, { useState } from "react";
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
import withReactContent from 'sweetalert2-react-content';
import { TokenAxios } from "../../apis/CommonAxios";

const MySwal = withReactContent(Swal);

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
const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
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

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    padding: 10px;
    font-size: 13px;
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

function createData(date, title, content, author) {
    return { date, title, content, author };
}

const initialRows = [
    createData('2024-05-01', '문의 제목 1', '문의 내용 1', '작성자 1'),
    createData('2024-05-02', '문의 제목 2', '문의 내용 2', '작성자 2'),
    createData('2024-05-03', '문의 제목 3', '문의 내용 3', '작성자 3'),
];

const Askadmin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [rows, setRows] = useState(initialRows);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filteredRows = initialRows.filter(row =>
            row.title.includes(searchTerm) || row.author.includes(searchTerm)
        );
        setRows(filteredRows);
    };

    const handleNameClick = (content) => {
        Swal.fire({
            icon: "info",
            title: "문의 내용",
            text: content,
            showCancelButton: true,
            confirmButtonColor: "black",
            confirmButtonText: "확인",
            cancelButtonText: "답변달기",
            preConfirm: () => {
         
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
    
                Swal.fire({
                    title: '답변을 입력하세요',
                    input: 'textarea',
                    inputPlaceholder: '답변을 입력하세요',
                    showCancelButton: true,
                    confirmButtonText: '제출',
                    cancelButtonText: '취소',
                    preConfirm: (reply) => {
                    
                        console.log(`Reply submitted: ${reply}`);
                        
                    }
                });
            }
        });
    };

    return (
        <PageContainer>
            <SearchContainer>
                <SearchInput 
                    type="text" 
                    placeholder="문의 제목 또는 작성자를 입력하세요" 
                    value={searchTerm} 
                    onChange={handleInputChange} 
                />
                <Button onClick={handleSearch}>검색</Button>
            </SearchContainer>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell>문의 날짜</StyledTableCell>
                            <StyledTableCell>문의 제목</StyledTableCell>
                            <StyledTableCell>문의 내용</StyledTableCell>
                            <StyledTableCell>작성자</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <StyledTableCell>{row.date}</StyledTableCell>
                                <StyledTableCell>
                                    <a href="#" onClick={() => handleNameClick(row.content)}>
                                        {row.title}
                                    </a>
                                </StyledTableCell>
                                <StyledTableCell>{row.content}</StyledTableCell>
                                <StyledTableCell>{row.author}</StyledTableCell>
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

export default Askadmin;
