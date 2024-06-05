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
    text-align: center; /* 가운데 정렬을 설정 */
    font-size: 14px;
`;


function createData(label, value) {
    return { label, value };
}

const Memberadmin = () => {
    const [memberInfo, setMemberInfo] = useState([
        createData('회원 이름', ''),
        createData('닉네임', ''),
        createData('ID', ''),
        createData('회원 이메일', ''),
        createData('직업', ''),
        createData('문의 내역', '문의 내역 바로가기')
    ]);

    const handleChange = (index, newValue) => {
        setMemberInfo(prevState => {
            const updatedMemberInfo = [...prevState];
            updatedMemberInfo[index].value = newValue;
            return updatedMemberInfo;
        });
    };

    const handleSaveClick = () => {
        // 저장하기 버튼 클릭 시 실행될 작업
        Swal.fire({
            title: '저장되었습니다!',
            icon: 'success',
            confirmButtonText: '확인',
        });
    };

    const handleShortcutClick = (row) => {
        // 문의 내역 보기
        Swal.fire({
            title: '문의 내용',
            html: '<p></p>',
            confirmButtonText: '확인',
            customClass: {
                popup: 'custom-popup-class',
                content: 'custom-content-class',
            },
            width: '900px',
            heightAuto: false,
        });
    };
    

    return (
        <PageContainer>
            <TableContainer>
                <StyledTable>
                    <tbody>
                        {memberInfo.map((row, index) => (
                            <tr key={index}>
                                <StyledTableCell>{row.label}</StyledTableCell>
                                <StyledTableCell>
                                    {row.label === '문의 내역' ? (
                                        <Button onClick={() => handleShortcutClick(row)}>
                                            {row.value}
                                        </Button>
                                    ) : (
                                        <input
                                            type="text"
                                            value={row.value}
                                            onChange={e => handleChange(index, e.target.value)}
                                        />
                                    )}
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
                        <Link to="/dataadmin">
                            <MenuItem color="neutral">데이터 관리</MenuItem>
                        </Link>
                        <Link to="/modeladmin">
                            <MenuItem color="neutral">학습 관리</MenuItem>
                        </Link>
                    </Menu>
                </Dropdown>
            </DropdownGroup>
            <Button onClick={handleSaveClick}>저장하기</Button>
            <Button onClick={() => window.history.back()}>돌아가기</Button>
        </PageContainer>
    );
};

export default Memberadmin;
