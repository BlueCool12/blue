import { createGlobalStyle } from 'styled-components';

export const AdminGlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;    
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    background: none;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    outline: none;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f0f0f0;
  }
`;
