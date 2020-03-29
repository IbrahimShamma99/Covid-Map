import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;
  width: calc(100vw - 16px);
  padding: 8px;

  background-color:rgb(35,35,35);
  box-shadow: 0px 2px 4px #d7d9df;

  font-size: 24px;
  color: #ffffff;
`;

const ScreenContainer = styled.div`
  height: calc(100vh - 60px);
  width: calc(100vw - 32px);
  padding: 0 15px;

  overflow: hidden;
  overflow-y: scroll;
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 73px);
  }
`;

const StatContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 32px;
  grid-row-gap: 24px;

  padding: 16px 0;

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    padding: 16px 0;
    grid-row-gap: 24px;
  }
`;

const StatItem = styled.div`
  display: flex;

  padding: 16px;

  background: #ffffff;
  box-shadow: 0px 2px 4px #d7d9df;
  border-radius: 8px;

  font-size: 12px;
  color: ${props => props.color || '#4f5d75'};

  transition: all 0.5s ease-in-out;

  :hover,
  :focus {
    transform: scale(1.01);
  }
`;

export { Header, ScreenContainer, StatContainer, StatItem };
