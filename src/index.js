import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function search(event) {
  const searchQuery = event.target.value.trim();
  if (searchQuery === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  } else {
    fetchCountries(searchQuery).then(renderMarkup);
  }
}

function renderMarkup(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
  } else if (countries.length > 1 && countries.length < 10) {
    const countryListMarkup = data
      .map(
        country =>
          `<li>
          <img
          src="${country.flags.svg}" 
          alt="${country.name.official}" 
          />${country.name.official}
          </li>`,
      )
      .join('');
    countryList.insertAdjacentHTML('beforeend', countryListMarkup);
  } else {
    const countryInfoMarkup = data
      .map(
        country =>
          `<li><img src="${country.flags.svg}" alt="${country.name.official}" />${country.name.official}</li>`,
      )
      .join('');
    countryInfo.insertAdjacentHTML('beforeend', countryInfoMarkup);
  }
}
