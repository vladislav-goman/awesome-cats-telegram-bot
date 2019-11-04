const fetch = require("node-fetch");
const { catAPIKey } = require("../hidden-folder/keys");

module.exports = class CatAPI {
  static _apiBase = "https://api.thecatapi.com/v1/";

  static _getResource = async path => {
    const response = await fetch(path, {
      method: "GET",
      mode: "cors",
      headers: {
        "x-api-key": catAPIKey
      }
    });
    return response.json();
  };

  static getRandomCatPhoto = async () =>
    this._getResource(`${this._apiBase}images/search`);

  static getCategoryCatPhoto = async id =>
    this._getResource(`${this._apiBase}images/search?category_ids=${id}`);

  static getAvalibleCategories = async () =>
    this._getResource(`${this._apiBase}categories`);
};
