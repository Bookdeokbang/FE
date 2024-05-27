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
import { TokenAxios } from "../../apis/CommonAxios";
import { useForm } from "react-hook-form";

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
    margin-top: 10px;
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
    cursor: pointer; /* 마우스 커서를 포인터로 변경하여 클릭 가능한 상태로 만듦 */
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
    font-family:logo;
    font-size: 16px;
    background-color: ${theme.colors.primary};
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const NoticeButton = styled(Button)`
    padding: 10px 20px;
    font-family:logo;
    font-size: 16px;
    background-color: ${theme.colors.primary};
    color: black;
    border-radius: 4px;
    cursor: pointer;

`;

function createData(title, content) {
    return { title, content };
}

const initialRows = [
    createData('제목 1', '내용 1' ),
    createData('제목 2', '내용 2' ),
    createData('제목 3', '내용 3'),
];

const Infoadmin = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [rows, setRows] = useState(initialRows);
    const { register, handleSubmit, setValue } = useForm();

    const fetchNotices = async (data) => {
        try {
            const response = await TokenAxios.post(`${API_BASE_URL}/v1/admin/notices`, data);
            console.log(response.data.result);
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filteredRows = initialRows.filter(row =>
            row.title.includes(searchTerm) || row.content.includes(searchTerm)
        );
        setRows(filteredRows);
    };

    const handleNotice = () => {
        Swal.fire({
            html:
                `<input id="title" class="swal2-input" placeholder="제목"/>
                 <textarea id="content" class="swal2-textarea" placeholder="내용"></textarea>`,
            showCancelButton: true,
            confirmButtonText: '저장',
            cancelButtonText: '취소',
            preConfirm: () => {
                const title = document.getElementById('title').value;
                const content = document.getElementById('content').value;
                if (!title || !content) {
                    Swal.showValidationMessage('제목과 내용을 모두 입력해주세요.');
                }
                return { title: title, content: content };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { title, content } = result.value;
                setValue("title", title);
                setValue("content", content);
                setValue("pinned", false);  // 'pinned' 값을 false로 설정
                handleSubmit(fetchNotices)();
                Swal.fire("저장되었습니다!", "", "success");
            } else {
                Swal.fire("공지사항이 저장되지 않았습니다.", "", "error");
            }
        });
    };

    const handleNameClick = (title, content) => {
        Swal.fire({
            title: '공지사항 내용',
            text: content, // 클릭한 행의 내용을 표시
            showCancelButton: true,
            confirmButtonText: '수정하기', // 확인 버튼을 수정하기로 변경
            cancelButtonText: '삭제하기', // 취소 버튼을 삭제하기로 변경
        }).then((result) => {
            if (result.isConfirmed) {
                // 수정하기 버튼 클릭 시의 동작
                Swal.fire({
                    title: '공지사항 수정',
                    html:
                        `<input id="title" class="swal2-input" value="${title}" placeholder="제목">
                         <textarea id="content" class="swal2-textarea" rows="5">${content}</textarea>`,
                    showCancelButton: true,
                    confirmButtonText: '저장',
                    cancelButtonText: '취소',
                    preConfirm: () => {
                        const title = document.getElementById('title').value;
                        const content = document.getElementById('content').value;
                        if (!title || !content) {
                            Swal.showValidationMessage('제목과 내용을 모두 입력해주세요.');
                        }
                        return { title: title, content: content };
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const { title, content } = result.value;
                        console.log("수정된 제목:", title);
                        console.log("수정된 내용:", content);
                        Swal.fire("저장되었습니다!", "", "success");
                    } else {
                        Swal.fire("수정이 취소되었습니다.", "", "error");
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // 삭제하기 버튼 클릭 시의 동작
                Swal.fire({
                    title: '삭제 확인',
                    text: '정말로 삭제하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: '삭제',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 삭제하는 로직
                        console.log('삭제됨');
                        Swal.fire(
                            '삭제 완료',
                            '항목이 삭제되었습니다.',
                            'success'
                        );
                    }
                });
            }
        });
    };

    return (
        <PageContainer>
            <form>
                <SearchContainer>
                    <SearchInput
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <SearchButton onClick={handleSearch}>검색</SearchButton>
                    <NoticeButton onClick={handleNotice}>공지사항 작성하기</NoticeButton>
                </SearchContainer>
                <TableContainer>
                    <StyledTable>
                        <thead>
                            <tr>
                                <StyledTableCell>등록 제목</StyledTableCell>
                                <StyledTableCell>등록 내용</StyledTableCell>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <StyledTableCell onClick={() => handleNameClick(row.title, row.content)}>
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.content}</StyledTableCell>
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
                        <MenuButton variant="plain" color="neutral" size="lg">USER</MenuButton>
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
                        </Menu>
                    </Dropdown>
                    <Dropdown>
                        <MenuButton variant="plain" color="neutral" size="lg">AI</MenuButton>
                        <Menu variant="plain">
                            <Link to="/aiadmin">
                                <MenuItem color="neutral">모델 정보 및 관리</MenuItem>
                            </Link>
                        </Menu>
                    </Dropdown>
                </DropdownGroup>
            </form>
        </PageContainer>
    );
}

export default Infoadmin;
