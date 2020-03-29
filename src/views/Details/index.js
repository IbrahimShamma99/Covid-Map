import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../Store';
import { getHistoricalDataByCountry } from '../../api';
import { Header, ScreenContainer, StatContainer, StatItem } from './styled';
import Chart from '../../components/Chart';

function Details() {
  const {
    state: { countries }
  } = useStore();
  const { country } = useParams();
  const [historicalData, setHistoricalData] = useState({});

  const searchCountry = countries.find(entry => entry.country === country);

  useEffect(() => {
    (async function getHistoricalData() {
      const data = await getHistoricalDataByCountry(country.toLowerCase());
      setHistoricalData(() => data);
    })();
  }, [country]);

  return (
    <>
      <Header>Detailed stats for {searchCountry.country}</Header>
      <ScreenContainer>
        <StatContainer>
          <StatItem>Total Cases: {searchCountry.cases}</StatItem>
          <StatItem>Today Cases: {searchCountry.todayCases}</StatItem>
          <StatItem color='#f1173f'>
            Total Deaths: {searchCountry.deaths}
          </StatItem>
          <StatItem color='#f1173f'>
            Today Deaths: {searchCountry.todayDeaths}
          </StatItem>
          <StatItem color='#0087d4'>
            Recovered: {searchCountry.recovered}
          </StatItem>
          <StatItem>Active: {searchCountry.active}</StatItem>
          <StatItem color='#f1173f'>
            Critical: {searchCountry.critical}
          </StatItem>
        </StatContainer>
        {historicalData.timeline &&
          Object.keys(historicalData.timeline.cases).length > 0 && (
            <>
              <div
                style={{
                  fontSize: '24px',
                  color: '#4f5d75',
                  marginLeft: '4px'
                }}>
                Historical Data
              </div>
              <Chart data={historicalData.timeline} />
            </>
          )}
      </ScreenContainer>
    </>
  );
}

export default Details;
