import { scaleLinear } from 'd3-scale';

export const GEO_URL =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

export const colorScale = range => {
  let ranges = new Array(5).fill(0);
  const rangeCreator = Math.round(range / 5);

  ranges = ranges.map((_, i) => rangeCreator * (i + 1));

  return scaleLinear()
    .domain([0, ...ranges])
    .range(['#f7d9d9', '#e16968', '#d63230', '#9c2523', '#4e1312']);
};

const missingCountries = [
  'USA',
  'Iran',
  'S. Korea',
  'UK',
  'UAE',
  'North Macedonia',
  'Moldova',
  'Palestine',
  'DRC',
  'Tanzania',
  'Syria'
];

const missingIso3 = [
  'USA',
  'IRN',
  'KOR',
  'GBR',
  'ARE',
  'MKD',
  'MDA',
  'PSE',
  'COD',
  'TZA',
  'SYR'
];

export const countriesDataSanitizer = countries => {
  const newData = [];
  countries.forEach(country => {
    const foundIndex = missingCountries.findIndex(c => c === country.country);
    if (foundIndex !== -1) {
      const newObject = { ...country };
      newObject.countryInfo.iso3 = missingIso3[foundIndex];
      newData.push(newObject);
    } else newData.push(country);
  });
  return newData;
};

export const FuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 50,
  maxPatternLength: 12,
  minMatchCharLength: 3
};
