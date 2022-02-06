import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import API from './fetchCountries';

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
  }
  API.fetchCountries(searchQuery).then(renderMarkup);
}

function renderMarkup(data) {
  if (data.status === 404) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    Notiflix.Notify.failure('Oops, there is no country with that name...');
  } else if (data.length > 10) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
  } else if (data.length > 1 && data.length < 10) {
    Notiflix.Notify.success(`Find ${data.length} matches.`);
    let countryListMarkup = data
      .map(
        country =>
          `<li class="country-list__item">
          <img
          class="flag"
          src="${country.flags.svg}" 
          alt="${country.name.official}" 
          />
          ${country.name.common}
          </li>`,
      )
      .join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    countryList.insertAdjacentHTML('beforeend', countryListMarkup);
  } else {
    let countryInfoMarkup = data
      .map(
        country =>
          `<h3>${country.name.common}</h3>
          <img
          class="flag"
          src="${country.flags.svg}"
          alt="${country.name.official}"
          />
        <h2>${country.name.official}</h2>
          <ul class="info">
          <li><b>Capital: </b>${country.capital}</li>
          <li><b>Population: </b>${country.population}</li>
          <li><b>Languages: </b>${Object.values(country.languages).join(', ')}</li>
          </ul>
          `,
      )
      .join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    countryInfo.insertAdjacentHTML('beforeend', countryInfoMarkup);
  }
}
