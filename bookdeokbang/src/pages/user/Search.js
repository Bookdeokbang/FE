import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';
import { Link } from 'react-router-dom';
import { TokenAxios } from "../../apis/CommonAxios";
import { Button } from "@mui/material";
import Pagination from '@mui/material/Pagination';

const Base = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.beige};
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    margin-bottom: 2vh;
`;

const CustomButton = styled(Button)`
    background-color: #00000;
    color: #000000;
    &:hover {
        background-color: #11111;
    }
    width: 150px;
    height: 50px;
    font-size: 20px;
    font-family:logo;
    margin-top: 20px; /* 페이지네이션과의 간격 조정 */
`;

const WhiteBox1 = styled.div`
    width: 100%;
    height: 100px;
    background-color: #fff;
    font-family:logo;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.black};
    box-sizing: border-box;
    text-align: center;
    justify-content: center;
    align-items: center; 
`;

const Font_Title = styled.h1`
    font-size: 20px;
    font-family: 'Logo';
    margin: 0;
    text-align: left;
`;

const Search = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [searchHistory, setSearchHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const res = await TokenAxios.get(`${API_BASE_URL}/v1/users/me/history?page=${currentPage}`);
            if (res.data.isSuccess) {
                setSearchHistory(res.data.result.userHistoryDtoList);
            } else {
                console.error("Error fetching data:", res.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <Base>
            <Container>
                <Title>
                    <Font_Title>최근 검색 내역</Font_Title>
                </Title>
                {searchHistory.map((item, index) => (
                    <WhiteBox1 key={index}>
                        <p>{item.content}</p>
                    </WhiteBox1>
                ))}
                <Pagination
                    count={Math.ceil(searchHistory.length / 10)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    variant="outlined"
                />
                <Link to="/main">
                    <CustomButton>돌아가기</CustomButton>
                </Link>
            </Container>
        </Base>
    );
};

export default Search;
