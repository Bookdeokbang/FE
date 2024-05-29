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
import { useForm } from "react-hook-form";
import axios from "axios";
import Pagination from '@mui/material/Pagination';

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
    cursor: pointer;
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
const StyledLink = styled(Link)`
color: #000; /* 링크 색상을 항상 검정색으로 설정 */
text-decoration: none; /* 링크의 밑줄을 제거 */

&:hover {
    color: #000; /* 호버 시에도 검정색 유지 */
}
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

const Infoadmin = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(8)
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        fetchNotices(currentPage);
    }, [currentPage]);
    
    const fetchNotices = async () => {
        try {
            const response = await TokenAxios.get(`${API_BASE_URL}/v1/admin/notices/all`);
            setRows(response.data.result);
        } catch (error) {
            console.error("Error fetching initial notices:", error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, [rows]);

    const updateNotice = async (noticeId, data) => {
        try {
            const response = await TokenAxios.patch(`${API_BASE_URL}/v1/admin/notices/${noticeId}/update`, data);
            if (response.data.isSuccess) {
                console.log("Updated notice:", response.data.result);
                const updatedResponse = await TokenAxios.get(`${API_BASE_URL}/v1/admin/notices`);
                setRows(updatedResponse.data.result);
            } else {
                console.error("Error updating notice:", response.data.message);
                Swal.fire("수정 실패", response.data.message, "error");
            }
        } catch (error) {
            console.error("Error updating notice:", error);
            Swal.fire("수정 실패", "공지사항을 수정하는 도중 오류가 발생했습니다.", "error");
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filteredRows = rows.filter(row =>
            row.title.includes(searchTerm) || row.content.includes(searchTerm)
        );
        setRows(filteredRows);
    };

    const handleNotice = async () => {
        const data = { title: '', content: '', pinned: false };
        try {
            const res = await TokenAxios.post(`${API_BASE_URL}/v1/admin/notices`, data);
            if (res.data.result === "_OK") {
                Swal.fire("등록 성공", "", "success");
                fetchNotices();
            }
        } catch (error) {
            console.error("Error adding notices:", error);
            Swal.fire("등록 실패", "오류가 발생했습니다.", "error");
        }
    
        Swal.fire({
            title: '공지사항 등록',
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
                return { title, content };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { title, content } = result.value;
                console.log("제목:", title, "내용:", content);
                // 서버에 데이터 전송
                handleNoticeSubmit(title, content);
            } else {
                Swal.fire("공지사항이 저장되지 않았습니다.", "", "error");
            }
        });
    };
    
    const handleNoticeSubmit = async (title, content) => {
        try {
            const data = { title, content, pinned: false };
            const res = await TokenAxios.post(`${API_BASE_URL}/v1/admin/notices`, data);
            if (res.data.result === "_OK") {
                Swal.fire("저장되었습니다!", "", "success");
                fetchNotices();
            }
        } catch (error) {
            console.error("Error adding notices:", error);
            Swal.fire("등록 실패", "오류가 발생했습니다.", "error");
        }
    };
    
    const handleNameClick = (title, content, id) => {
        Swal.fire({
            title: '공지사항 내용',
            text: content,
            showCancelButton: true,
            confirmButtonText: '수정하기',
            cancelButtonText: '삭제하기',
        }).then((result) => {
            if (result.isConfirmed) {
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
                        return { title, content };
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const { title, content } = result.value;
                        setValue("title", title);
                        setValue("content", content);
                        setValue("pinned", false);
                        handleSubmit((data) => updateNotice(id, data))();
                        Swal.fire("저장되었습니다!", "", "success");
                    } else {
                        Swal.fire("수정이 취소되었습니다.", "", "error");
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
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

   // getCurrentRows 함수 수정
const getCurrentRows = () => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return rows.slice(indexOfFirstRow, indexOfLastRow);
};
  const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <PageContainer>
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
                            <tr key={index} onClick={() => handleNameClick(row.title, row.content, row.id)}>
                                <StyledTableCell>{row.title}</StyledTableCell>
                                <StyledTableCell>{row.content}</StyledTableCell>
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
                        <Link to="/infoadmin">
                <MenuItem color="neutral">공지사항 관리</MenuItem>
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
        </PageContainer>
    );
};

export default Infoadmin;
