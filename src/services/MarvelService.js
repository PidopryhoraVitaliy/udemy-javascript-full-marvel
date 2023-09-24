
class MarvelService {

    _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    _apiKey = `apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;

    getResurce = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Coild not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResurce(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }

}

export default MarvelService;