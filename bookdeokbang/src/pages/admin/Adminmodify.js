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


const StyledTable = styled(Table)`
  width: 80%;
  border-collapse: collapse;

  th, td {
    border: 1px solid ${theme.colors.gray}; /* 테이블 셀의 테두리 스타일 설정 */
    padding: 8px;
    text-align: left;
    background-color: transparent; /* 배경색을 투명하게 설정 */
  }

  th {
    background-color: transparent; /* 테이블 헤더의 배경색을 투명하게 설정 */
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1); /* 짝수 행의 배경색을 투명하게 설정 */
  }

  tr:nth-child(odd) {
    background-color: transparent; /* 홀수 행의 배경색을 투명하게 설정 */
  }
`;


// 셀 스타일
const TableCell = styled.td`
  border: 1px solid ${theme.colors.gray};
  padding: 8px;
`;

// 입력 가능한 셀 스타일
const InputCell = styled.input`
  width: 100%;
  border: none;
  padding: 8px;
  background-color: transparent;
  color: ${theme.colors.black};
  outline: none;

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;
const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
`;
const BasicTable = () => {
    return (
      <StyledTable>
        <tbody>
          <tr>
            <TableCell>
              이름
            </TableCell>
            <TableCell>
              <InputCell type="text" placeholder="Enter name" />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              <InputCell type="text" placeholder="Enter ID" />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              이메일
            </TableCell>
            <TableCell>
              <InputCell type="text" placeholder="Enter e-mail" />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              비밀번호
            </TableCell>
            <TableCell>
              <InputCell type="text" placeholder="Enter password" />
            </TableCell>
          </tr>
          <tr>
            <TableCell>
              비밀번호 확인
            </TableCell>
            <TableCell>
              <InputCell type="text" placeholder="Enter password" />
            </TableCell>
          </tr>
        </tbody>
      </StyledTable>
    );
  }
  



const Adminmodify = () => {
    const [alignment, setAlignment] = useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <PageContainer>
            <Gramary>Gramary</Gramary>
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
        </Menu>
    </Dropdown>
</DropdownGroup>
 <BasicTable />
            <Button>저장하기</Button>
        </PageContainer>
    );
}

export default Adminmodify;
