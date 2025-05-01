import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* 기본 Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 문서/기본 구조 */
  html, body {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s, color 0.3s;
  }

  /* 제목 태그 초기화 */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.2;
  }

  /* 문단 스타일 */
  p {
    margin-bottom: 1em;
    line-height: 1.6;
  }

  /* 링크 */
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.linkHoverColor || '#3498db'};
    }
  }

  /* 버튼 */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  /* 폼 요소 공통 */
  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }

  /* 텍스트 선택 시 색상 */
  ::selection {
    background: ${({ theme }) => theme.selectionBg || '#a0c4ff'};
    color: ${({ theme }) => theme.selectionText || '#fff'};
  }

  /* 이미지/비디오 반응형 */
  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;
