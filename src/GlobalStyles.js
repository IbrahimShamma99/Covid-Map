import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }


  svg {
    display: inline-block;
    vertical-align: middle;
    background-color:rgb(35,35,35);
  }

  a:link, a:visited, a:hover, a:active {
    text-decoration: none;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  .main-map {
    height: 100vh;
    width: 100vw;
  }

  .rsm-geographies{
    path {
      cursor: pointer
    }
  }
`;

export const Credits = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 16px;

  margin-bottom: 16px;

  font-size: 15px;

  @media only screen and (max-width: 768px) {
    left: 0;
    margin: 0;
    bottom: 150px;
    transform: rotate(270deg);
    transform-origin: 0 0;

    font-size: 10px;
  }
`;
