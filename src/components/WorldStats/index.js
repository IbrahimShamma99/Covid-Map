import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

const Container = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;

  width: 256px;
  height: 120px;
  padding: 16px;
  margin: 0 0 16px 16px;

  background: #ffffff;
  box-shadow: 0px 2px 4px #d7d9df;
  border-radius: 16px;

  transition: max-height 0.15s ease-out;

  @media only screen and (max-width: 768px) {
    position: fixed;
    width: calc(100vw - 32px);
    height: ${props => (props.height === 'true' ? '120px' : '10px')};
    max-height: ${props => (props.height === 'true' ? '150px' : '15px')};
    margin: 0;
    border-radius: 8px;
    transition: ${props =>
      props.height === 'true' ? 'all 0.5s ease-in' : 'all 0.5s ease-out'};
    overflow: hidden;
  }
`;

const Text = styled.div`
  flex-shrink: 0;

  margin-bottom: 8px;

  font-size: ${props => props.size || '14px'};
  color: ${props => props.color && props.color};

  :last-child {
    margin: 0;
  }
`;

const Icon = styled.div`
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
    margin-left: auto;
    height: 24px;
    width: 24px;
    cursor: pointer;

    svg {
      height: 100%;
      width: 100%;
    }
  }
`;

function formatDate(data) {
  const dateParts = Date(data)
    .toString()
    .split(' ');

  let newDate = '';

  for (let i = 0; i < 5; i += 1) {
    newDate = newDate.concat(`${dateParts[i]} `);
  }

  return newDate;
}

function GlobalStats({ stats }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container height={expanded ? 'true' : 'false'}>
      <div style={{ display: 'flex', alignItems: 'normal', flexShrink: 0 }}>
        <div style={{ margin: 0, marginBottom: '8px', fontSize: '16px' }}>
          Global Stats
        </div>
        <Icon>
          {expanded ? (
            <GoChevronDown
              onClick={() => setExpanded(prevState => !prevState)}
            />
          ) : (
            <GoChevronUp onClick={() => setExpanded(prevState => !prevState)} />
          )}
        </Icon>
      </div>
      <Text color='#4f5d75'>Cases: {stats.cases}</Text>
      <Text color='#0087d4'>Recovered: {stats.recovered}</Text>
      <Text color='#f1173f'>Deaths: {stats.deaths}</Text>
      <Text size='10px'>Last Updated On: {formatDate(stats.updated)}</Text>
    </Container>
  );
}

GlobalStats.propTypes = {
  stats: PropTypes.shape({
    cases: PropTypes.number,
    deaths: PropTypes.number,
    recovered: PropTypes.number,
    updated: PropTypes.number
  })
};

GlobalStats.defaultProps = {
  stats: {}
};

export default React.memo(GlobalStats);
