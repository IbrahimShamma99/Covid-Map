import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useWindowSize from '../../hooks/useWindowSize';

const sanitizeData = (object = {}) => {
  const { cases, deaths, recovered } = object;

  const casesDates = Object.keys(cases);
  const deathsDates = Object.keys(cases);
  const recoveredDates = Object.keys(cases);

  return casesDates.reduce((acc, date) => {
    const entry = { date, cases: cases[date] };
    if (deathsDates.includes(date) === -1) entry.deaths = 0;
    else entry.deaths = deaths[date];
    if (recoveredDates.includes(date) === -1) entry.recovered = 0;
    else entry.recovered = recovered[date];
    return [...acc, entry];
  }, []);
};

function Chart({ data }) {
  const { width } = useWindowSize();
  const [showDot, setShowDot] = useState(true);

  useEffect(() => {
    if (width < 769) setShowDot(() => false);
    else setShowDot(() => true);
  }, [width]);

  return (
    <ResponsiveContainer width='100%' height={512}>
      <LineChart data={sanitizeData(data)} margin={{ top: 16, bottom: 16 }}>
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis
          label={{
            value: 'Dates',
            fontSize: '16px',
            position: 'insideBottom',
            offset: 0
          }}
          tick={{ fontSize: '10px' }}
          dataKey='date'
          height={45}
        />
        <YAxis
          label={{
            value: 'Cases',
            fontSize: '16px',
            angle: -90,
            position: 'insideLeft'
          }}
          tick={{ fontSize: '10px' }}
        />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='cases'
          stroke='#4f5d75'
          dot={showDot ? { strokeWidth: 0.2 } : false}
        />
        <Line
          type='monotone'
          dataKey='deaths'
          stroke='#f1173f'
          dot={showDot ? { strokeWidth: 0.2 } : false}
        />
        <Line
          type='monotone'
          dataKey='recovered'
          stroke='#0087d4'
          dot={showDot ? { strokeWidth: 0.2 } : false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default React.memo(Chart);
