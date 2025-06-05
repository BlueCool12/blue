'use client';

import styled, { keyframes } from "styled-components";

export const LoadingSpinner = () => {

    return (
        <SpinnerWrapper>
            <Spinner />
        </SpinnerWrapper>
    );
};

const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75vh;
    padding: 40px 0;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }  
    100% {transform: rotate(360deg); }
`;

const Spinner = styled.div`
    width: 48px;
    height: 48px;
    border: 6px solid var(--border-color);
    border-top: 6px solid var(--text-color);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;