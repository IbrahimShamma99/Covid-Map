import axios from 'axios';
import { countriesDataSanitizer } from '../utils/Constants';

const BASE_URL = 'https://corona.lmao.ninja';

async function getAll() {
  try {
    if (!sessionStorage.getItem('all')) {
      const { data } = await axios.get(`${BASE_URL}/all`);
      sessionStorage.setItem('all', JSON.stringify(data));
      return data;
    }
    return JSON.parse(sessionStorage.getItem('all'));
  } catch (e) {
    const { data } = await axios.get(`${BASE_URL}/all`);
    return data;
  }
}

async function getAllCountries() {
  try {
    if (!sessionStorage.getItem('allCountries')) {
      const { data } = await axios.get(`${BASE_URL}/countries`);
      const sanitizedData = countriesDataSanitizer(data);
      sessionStorage.setItem('allCountries', JSON.stringify(sanitizedData));
      return sanitizedData;
    }
    return JSON.parse(sessionStorage.getItem('allCountries'));
  } catch (e) {
    const { data } = await axios.get(`${BASE_URL}/countries`);
    const sanitizedData = countriesDataSanitizer(data);
    return sanitizedData;
  }
}

async function getHistoricalDataByCountry(country) {
  try {
    const { data } = await axios.get(`${BASE_URL}/historical/${country}`);
    return data;
  } catch (e) {
    return getHistoricalDataByCountry(country);
  }
}

export { getAll, getAllCountries, getHistoricalDataByCountry };
