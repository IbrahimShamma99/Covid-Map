import PropTypes from 'prop-types';
import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { colorScale, GEO_URL } from '../../utils/Constants';

function WorldMap({ setTooltipContent, covid19DataScale, countriesData }) {
  const getColor = count => {
    const scale = colorScale(covid19DataScale);
    const color = scale(count);
    return color;
  };

  return (
    <ComposableMap data-tip='' className='main-map' projection='geoMercator'>
      <ZoomableGroup zoom={1}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const foundCountry = countriesData.find(
                ({ countryInfo }) => countryInfo.iso3 === geo.properties.ISO_A3
              );

              const newGeoObject = { ...geo, countryData: foundCountry };

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={newGeoObject}
                  fill={foundCountry ? getColor(foundCountry.cases) : '#F5F4F6'}
                  onMouseEnter={() => {
                    const {
                      countryData,
                      properties: { NAME }
                    } = newGeoObject;
                    if (countryData) {
                      setTooltipContent({
                        name: NAME,
                        cases: countryData.cases,
                        recovered: countryData.recovered,
                        deaths: countryData.deaths
                      });
                    } else {
                      setTooltipContent({ name: NAME });
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    default: { stroke: '#ff' },
                    hover: {
                      fill: '#F00',
                      outline: ''
                    },
                    pressed: {
                      fill: '#F00',
                      outline: 'none'
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}

WorldMap.propTypes = {
  setTooltipContent: PropTypes.func,
  covid19DataScale: PropTypes.number,
  countriesData: PropTypes.arrayOf(PropTypes.any)
};

WorldMap.defaultProps = {
  setTooltipContent: () => {},
  covid19DataScale: 0,
  countriesData: []
};

export default React.memo(WorldMap);
