import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useInputFocus from '../../hooks/useInputFocus';
import useSearch from '../../hooks/useSearch';
import { FuseOptions } from '../../utils/Constants';

const SearchInput = styled.input`
  height: 24px;
  width: 100%;
  margin-right: 8px;
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: bolder;

  :focus,
  :hover {
    border-bottom: 1px solid #ffffff;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0;

  margin: 16px 24px 0 0;

  height: 24px;
  width: 24px;

  color: #263238;

  cursor: pointer;

  svg {
    height: 100%;
    width: 100%;
  }
`;

const Sidebar = styled.section`
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  height: calc(100vh - 32px);
  width: 256px;
  padding: 16px;

  background: #263238;

  overflow: hidden;

  svg {
    height: 24px;
    width: 24px;
    float: right;

    color: #ffffff;

    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    height: calc(100vh - 48px);
  }
`;

const CountriesListContainer = styled.div`
  width: 100%;
  height: calc(100% - 48px);
  margin-left: 2.5px;

  overflow-y: scroll;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: baseline;

  cursor: pointer;
`;

const Text = styled.div`
  margin-top: 12px;

  font-size: 12px;
  color: white;
`;

const Icon = styled.div`
  margin-left: auto;
  height: 12px;
  width: 12px;

  color: #ffffff;

  svg {
    height: 100%;
    width: 100%;
  }
`;

function Search({ initialData }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const [data, setData] = useState(initialData);

  const { results, search, searchTerm } = useSearch({
    data,
    options: FuseOptions
  });
  const { ref } = useInputFocus(showSideBar);

  useEffect(() => {
    setData(() => initialData);
  }, [initialData]);

  return (
    <>
      {!showSideBar ? (
        <SearchIcon onClick={() => setShowSideBar(() => true)}>
          <GoSearch />
        </SearchIcon>
      ) : (
        <Sidebar>
          <div style={{ display: 'flex' }}>
            <SearchInput
              ref={ref}
              placeholder='Search country to view details'
              value={searchTerm}
              onChange={e => {
                search(e.target.value);
              }}
            />
            <IoMdClose onClick={() => setShowSideBar(() => false)} />
          </div>
          <CountriesListContainer>
            {results.map((country, i) => {
              const key = i;
              return (
                <Link key={key} to={`/${country}`}>
                  <TextContainer>
                    <Text>{country}</Text>
                    <Icon>
                      <FiArrowRight />
                    </Icon>
                  </TextContainer>
                </Link>
              );
            })}
          </CountriesListContainer>
        </Sidebar>
      )}
    </>
  );
}

Search.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.any)
};

Search.defaultProps = {
  initialData: []
};

export default React.memo(Search);
