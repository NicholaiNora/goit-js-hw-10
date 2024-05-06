import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_tyFh2bUPxOyeDBdWx6Eg4ANFVFfeOMOc1n2bnIMcvgFBaXFabgYYA8W7UEHvOizv';

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
