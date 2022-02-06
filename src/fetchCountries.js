export default function fetchCountries(searchQuery) {
  fetch(
    `https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags.svg,languages`,
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    }
    response.json();
  });
}
