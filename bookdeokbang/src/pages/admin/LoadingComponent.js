// LoadingComponent.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* 배경을 반투명하게 만듦 */
    z-index: 9999; /* 다른 요소들 위에 표시하기 위해 z-index 설정 */
`;

const LoadingComponent = () => {
    return (
        <LoadingContainer>
            <CircularProgress color="primary" /> {/* 로딩 스피너 */}
        </LoadingContainer>
    );
};

export default LoadingComponent;