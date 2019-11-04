const fetch = require("node-fetch");
module.exports = class CatAPI {

    _apiBase = 'https://api.thecatapi.com/v1/';

    getRandomCatPhoto = () => {
        return this._apiBase;
    }

}