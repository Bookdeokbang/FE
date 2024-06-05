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
import { Link, useParams } from "react-router-dom"; 
import { TokenAxios } from "../../apis/CommonAxios";
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

const StyledLink = styled(Link)`
    color: #000;
    text-decoration: none;
    
    &:hover {
        color: #000;
    }
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
    text-align: center;
    font-size: 14px;
`;

const Saveadmin = () => {
    const { sentenceId } = useParams();
    const [generatedSentence, setGeneratedSentence] = useState("");
    const [sentenceInfo, setSentenceInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10); // 페이지당 행 수
    const [pageSize] = useState(20); // 페이지당 아이템 수

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetchSentenceInfo();
    }, [API_BASE_URL]);

    const fetchSentenceInfo = async () => {
        try {
            let currentPage = 1;
            let allSentences = [];
            while (true) {
                const response = await TokenAxios.get(`${API_BASE_URL}/v1/admin/sentences?pageNo=${currentPage}&pageSize=${pageSize}`);
                if (response.data && response.data.isSuccess) {
                    const { content } = response.data.result;
                    allSentences = allSentences.concat(content);
                    currentPage++;
                    // 만약 더 이상 가져올 데이터가 없으면 종료
                    if (!content || content.length === 0 || currentPage > Math.ceil(content.length / pageSize)) break;
                } else {
                    console.error("Error fetching sentence info:", response.data);
                    Swal.fire("오류", "문장 정보를 가져오는 중 오류가 발생했습니다.", "error");
                    break;
                }
            }
            // 문장 정보 설정
            const modifiedResult = allSentences.map(sentence => ({
                content: sentence.content,
                grammar: sentence.grammar
            }));
            setSentenceInfo(modifiedResult);
        } catch (error) {
            console.error("Error fetching sentence info:", error);
            Swal.fire("오류", "문장 정보를 가져오는 중 오류가 발생했습니다.", "error");
        }
    };
    
// 현재 페이지의 행 가져오기
const indexOfLastRow = currentPage * pageSize;
const indexOfFirstRow = indexOfLastRow - pageSize;
const currentRows = sentenceInfo.slice(indexOfFirstRow, indexOfLastRow);



    // 페이지 변경 핸들러
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleGenerateSentence = async () => {
        const { value: generatedText } = await Swal.fire({
            title: '문장 생성하기',
            input: 'text',
            inputLabel: '생성할 문장을 입력하세요',
            inputPlaceholder: '문장을 입력해주세요',
            showCancelButton: true,
            confirmButtonText: '생성',
            cancelButtonText: '취소',
            inputValidator: (value) => {
                if (!value) {
                    return '문장을 입력해주세요!';
                }
            }
        });

        if (generatedText) {
            try {
                const response = await TokenAxios.post(`${API_BASE_URL}/v1/admin/sentences/generate`, generatedText);
                if (response.data && response.data.isSuccess) {
                    Swal.fire('등록 완료!', '문장이 성공적으로 등록되었습니다.', 'success');
                    fetchSentenceInfo(); // 문장이 등록되면 페이지 갱신
                } else {
                    throw new Error("Failed to generate sentence");
                }
            } catch (error) {
                console.error("Error generating sentence:", error);
                Swal.fire("오류", "문장을 생성하는 중 오류가 발생했습니다.", "error");
            }
        }
    };

    return (
        <PageContainer>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell>문법 정보</StyledTableCell>
                            <StyledTableCell>문장</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((sentence, index) => (
                            <tr key={index}>
                                <StyledTableCell>{sentence.content}</StyledTableCell>
                                <StyledTableCell>{sentence.grammar}</StyledTableCell>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(sentenceInfo.length / rowsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    variant="outlined"
                />
            </Stack>
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
                    <MenuButton variant="plain" color="neutral" size="lg">AI</MenuButton>
                    <Menu variant="plain">
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
            <Button onClick={handleGenerateSentence}>문장 생성하기</Button>
         
        </PageContainer>
    );
};

export default Saveadmin;
