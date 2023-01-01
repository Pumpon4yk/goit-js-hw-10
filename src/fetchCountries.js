export default class FetchCountries{
    constructor(){
        this.nameCountry = '';
    }

    fetch(){
        const url = 'https://restcountries.com/v3.1/';
        const opt = 'fields=name,capital,population,flags,languages'

        return  fetch(`${url}name/${this.nameCountry}?${opt}`)
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(err => {
                return err
            })
        
    }

    get name(){
        return this.nameCountry;
    }
    
    set name(name){
        this.nameCountry = name;
    }
}