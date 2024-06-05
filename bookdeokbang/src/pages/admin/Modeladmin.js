import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
import Papa from 'papaparse'; // papaparse 라이브러리 import

const SwalWithReactContent = withReactContent(Swal);

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
    margin: 20px auto; /* 수정: 좌우 마진을 auto로 설정하여 수평 가운데 정렬 */
    overflow-x: auto;
    display: flex; /* 추가: 플렉스 컨테이너로 설정 */
    justify-content: center; /* 추가: 가운데 정렬 */
`;

const StyledLink = styled(Link)`
    color: #000; /* 링크 색상을 항상 검정색으로 설정 */
    text-decoration: none; /* 링크의 밑줄을 제거 */
    
    &:hover {
        color: #000; /* 호버 시에도 검정색 유지 */
    }
`;

const StyledTable = styled(Table)`
    width: 50%; /* 수정: AI 관리 표의 너비 조정 */
    border-collapse: collapse;
`;

const StyledTableCell = styled.td`
    padding: 8px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 14px;
    width: 400px;
`;

const FileInputContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const FileInputLabel = styled.label`
    padding: 10px 20px;
    background-color: ${theme.colors.primary};
    color: black;
    border-radius: 4px;
    cursor: pointer;
`;

const FileInput = styled.input`
    display: none; /* 실제로는 보이지 않도록 설정 */
`;

const Modeladmin = () => {
    const API_BASE_URL = "http://34.64.139.6:8000";
    const [selectedFileName, setSelectedFileName] = useState(""); // 선택한 파일 이름 상태 추가
    
    const [modelFiles, setModelFiles] = useState([]);

    useEffect(() => {
        const fetchModelFiles = async () => {
            try {
                const response = await TokenAxios.get(`${API_BASE_URL}/model_files`);
                setModelFiles(response.data.model_files);
            } catch (error) {
                console.error("Error fetching model files:", error);
            }
        };

        fetchModelFiles();
    }, []);

    const handleTrainModel = () => {
        SwalWithReactContent.fire({
            title: "모델 학습 시작",
            html:
                '<input class="swal2-input" type="number" placeholder="Epoch">' +
                '<input class="swal2-input" placeholder="Model Name">' +
                '<div id="file-input-container" style="text-align: center; margin-top: 20px;">' +
                '   <label for="swal-input3" style="padding: 10px 20px; background-color: ${theme.colors.primary}; color: black; border-radius: 4px; cursor: pointer;">파일 선택</label>' +
                '   <input id="swal-input3" class="swal2-file" type="file" accept=".csv" style="display: none;">' +
                '</div>',
            focusConfirm: false,
            preConfirm: () => {
                const epoch = parseInt(SwalWithReactContent.getPopup().querySelectorAll(".swal2-input")[0].value);
                const modelName = SwalWithReactContent.getPopup().querySelectorAll(".swal2-input")[1].value;
                const file = SwalWithReactContent.getPopup().querySelector(".swal2-file").files[0];
                setSelectedFileName(file ? file.name : ""); 
                return { epoch, modelName, file };
            }
        }).then(result => {
            if (result.isConfirmed) {
                const { epoch, modelName, file } = result.value;
                if (isNaN(epoch) || epoch <= 0) {
                    SwalWithReactContent.fire({
                        icon: 'error',
                        title: '올바른 에포크 값을 입력하세요!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
                console.log("Epoch:", epoch);
                console.log("Model Name:", modelName);
                console.log("File:", file);
                console.log("Selected File Name:", selectedFileName); 
    
                if (!file) {
                    SwalWithReactContent.fire({
                        icon: 'error',
                        title: '파일을 선택하세요!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
    
                const formData = new FormData();
                formData.append('epoch', epoch);
                formData.append('model_name', modelName);
                formData.append('file', file);
    
                TokenAxios.post(`${API_BASE_URL}/train`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log("Train response:", response.data);
                        SwalWithReactContent.fire({
                            icon: 'success',
                            title: '모델 학습을 시작합니다!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        console.error("Error during model training:", error);
                        SwalWithReactContent.fire({
                            icon: 'error',
                            title: '모델 학습 중 오류가 발생했습니다!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };
    
    return (
        <PageContainer>
            <Button onClick={handleTrainModel}>학습시키기</Button>
          
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTableCell colSpan={3}>모델 관리</StyledTableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {modelFiles.map((modelName, index) => (
                            <tr key={index}>
                                <StyledTableCell colSpan={3}>{modelName}</StyledTableCell>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>
            

            {/* 기타 UI */}
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
                        variant="plain" >
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
        </PageContainer>
    );
}

export default Modeladmin;
