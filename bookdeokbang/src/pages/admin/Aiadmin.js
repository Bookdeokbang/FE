import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
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
    margin: 20px;
    overflow-x: auto;
`;

const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
`;

const StyledTable = styled(Table)`
    width: 100%;
    border-collapse: collapse;
`;

const StyledTableCell = styled.td`
    padding: 8px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 14px;
    width: 100px; /* 필요에 따라 너비 조정 */
`;

function createData(Date, Info) {
    return { Date, Info };
}

const Aiadmin = () => {
    const API_BASE_URL = "http://34.64.139.6:8000";
    const [modelInfo, setModelInfo] = useState({
        status: '',
        model_name: '',
        lastUpdateDate: '0000-00-00 00:00',
        num_parameters: 0,
        num_layers: 0,
        hidden_size: 0,
        num_attention_heads: 0,
        vocab_size: 0,
        max_position_embeddings: 0,
        type_vocab_size: 0,
        initializer_range: 0,
        layer_norm_eps: 0,
        pad_token_id: 0,
        bos_token_id: 0,
        eos_token_id: 0,
    });

    useEffect(() => {
        const fetchModelInfo = async () => {
            try {
                const res = await TokenAxios.get(`${API_BASE_URL}/model_info`);
                setModelInfo(res.data);
            } catch (error) {
                console.error("모델 정보를 가져오는 중 오류 발생:", error);
                if (error.response) {
                    // 서버가 응답했지만 상태 코드가 2xx 범위가 아닌 경우
                    console.error('서버 응답 오류:', error.response.data);
                } else if (error.request) {
                    // 요청이 만들어졌지만 응답을 받지 못한 경우
                    console.error('응답 없음:', error.request);
                } else {
                    // 오류를 발생시킨 요청 설정 중 문제 발생
                    console.error('요청 설정 오류:', error.message);
                }
                Swal.fire('오류', '모델 정보를 가져오는 데 실패했습니다.', 'error');
            }
        };

        fetchModelInfo();
    }, []);

    const rows = [
        createData('model_name', modelInfo.model_name),
        createData('status', modelInfo.status),
        createData('parameters', modelInfo.num_parameters),
        createData('layers', modelInfo.num_layers),
        createData('hidden_size', modelInfo.hidden_size),
        createData('attention_heads', modelInfo.num_attention_heads),
        createData('vocab_size', modelInfo.vocab_size),
        createData('max_position_embeddings', modelInfo.max_position_embeddings),
        createData('type_vocab_size', modelInfo.type_vocab_size),
        createData('initializer_range', modelInfo.initializer_range),
        createData('layer_norm_eps', modelInfo.layer_norm_eps),
        createData('pad_token_id', modelInfo.pad_token_id),
        createData('bos_token_id', modelInfo.bos_token_id),
        createData('eos_token_id', modelInfo.eos_token_id),
        createData('서버 통신 상태', 'http://34.64.139.6:3000/d/OS7-NUiGz/spring-boot-statistics-and-endpoint-metrics?orgId=1&refresh=10s'),
    ];

    return (
        <PageContainer>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell colSpan={2}>AI 관리</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <StyledTableCell>{row.Date}</StyledTableCell>
                                <StyledTableCell>
                                    {typeof row.Info === 'string' && row.Info.startsWith('http') ? (
                                        <a href={row.Info} target="_blank" rel="noopener noreferrer">
                                            {row.Info}
                                        </a>
                                    ) : (
                                        row.Info
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
                    </Menu>
                </Dropdown>
            </DropdownGroup>
        </PageContainer>
    );
}

export default Aiadmin;
