import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { getAll, getAllCountries } from '../../api';
import WorldMap from '../../components/Map';
import Search from '../../components/Search';
import GlobalStats from '../../components/WorldStats';
import { useStore } from '../../Store';
import { Credits } from '../../GlobalStyles';

function Main() {
  const { state, dispatch } = useStore();
  const [covid19Data, setCovid19Data] = useState({});
  const [tooltipContent, setTooltipContent] = useState({});

  useEffect(() => {
    (async function getData() {
      const data = await getAll();
      setCovid19Data(() => data);
    })();
  }, []);

  useEffect(() => {
    (async function getAllCountriesData() {
      const data = await getAllCountries();
      dispatch({ type: 'SET_COUNTRIES', payload: data });
    })();
  }, [dispatch]);

  return (
    <>
      <Search initialData={state.countries.map(country => country.country)} />
      <GlobalStats stats={covid19Data} />
      <WorldMap
        setTooltipContent={setTooltipContent}
        covid19DataScale={covid19Data.cases}
        countriesData={state.countries}
      />
      {tooltipContent.length !== 0 && (
        <ReactTooltip>
          <h4>{tooltipContent.name && tooltipContent.name}</h4>
          {tooltipContent.cases && <h5>Cases: {tooltipContent.cases}</h5>}
          {tooltipContent.recovered && (
            <h5>Recovered: {tooltipContent.recovered}</h5>
          )}
          {tooltipContent.deaths && <h5>Deaths: {tooltipContent.deaths}</h5>}
        </ReactTooltip>
      )}
      <Credits>
        &#x24B8; Ibrahim Made with
        <span style={{ color: 'red' }}> &#x2764; </span>
        using
        <a href='https://github.com/NovelCOVID/API'> NovelCOVID API.</a>
      </Credits>
    </>
  );
}

export default Main;
