import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import FetchCountries from './fetchCountries'
import listTml from "./templates/list.hbs"


const DEBOUNCE_DELAY = 300;


const refs ={
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    card: document.querySelector('.country-info'),
}

const fetchCountries = new FetchCountries()

refs.input.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY))

function inputSearch(e){
    const country = e.target.value.trim()

    if (country === '') {
        clearList()
        return refs.card.innerHTML = "";
    }

    fetchCountries.name = country;

    fetchCountries.fetch()
    .then(data => {
        arreyCheckLength(data);
        return data
    })
}


function arreyCheckLength(arr) {
    if (arr.length > 10) {
        clearList()
        clearCard()
        return Notify.info("Too many matches found. Please enter a more specific name.");
    }

    if(arr.status === 404){
        clearList()
        clearCard()
        return Notify.failure("Oops, there is no country with that name");
    }

    if (arr.length === 1) {
        clearList()
        return createCard(...arr)
    }

    return appendList(arr)
}

function createCard(arr) {
    const {flags: {svg:icon}, name: {official, common}, capital, population, languages} = arr;
    const card = `<div class="container">
    <h2 class="country">
    <img class="flag" src="${icon}" alt="flag"> 
        ${official}</h2>
    <p class="titel"><span class="span">Capital: </span>${capital}</p>
    <p class="titel"><span class="span">Population: </span>${population}</p>
    <p class="titel"><span class="span">Languages: </span>${Object.values(languages)}</p>
</div>`

    refs.card.innerHTML = card;
}

function appendList(arr) {
    clearCard()
    refs.list.innerHTML = listTml(arr)
}

function clearList() {
    return refs.list.innerHTML = "";
}

function clearCard() {
    refs.card.innerHTML = "";
}