import { fetchBreeds, fetchCatByBreed } from "./cat_api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectBreed = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const cat = document.querySelector(".cat-info");

function chooseBreed() {
  selectBreed.classList.add('is-hidden');
  loader.classList.replace('is-hidden', 'loader');
  fetchBreeds()
    .then(response => {
      // Handle the response
      console.log(response.data);
      let optionsMarkup = response.data.map(({ id, name }) => {
        return `<option value=${id}>${name}</option> `;
      });
      selectBreed.insertAdjacentHTML('beforeend', optionsMarkup);
      new SlimSelect({
        select: selectBreed,
      });
      selectBreed.classList.remove('is-hidden');
      loader.classList.replace('loader', 'is-hidden');
    })
    .catch(onError);
   
}


selectBreed.addEventListener("change", (e) => {
  loader.classList.replace('is-hidden', 'loader');
  selectBreed.classList.add('is-hidden');
  cat.classList.add('is-hidden');
  //   catInfoEl.classList.add('is-hidden');
  let breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(response => {
      const { url, breeds } = response.data[0];
      const { name, description, temperament } = breeds[0];
      console.log(breeds[0]);
      cat.innerHTML = `<img src=${url} alt=${name} width="400">
    <div class="text-container">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`;
      cat.classList.remove('is-hidden');
      loader.classList.replace('loader', 'is-hidden');
    })
    .catch(onError);
})

chooseBreed();

function onError() {
  loader.classList.replace('loader', 'is-hidden');
   Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}