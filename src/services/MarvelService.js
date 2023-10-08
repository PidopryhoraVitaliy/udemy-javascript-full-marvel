
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

    getAllCharacters = async () => {
        const res = await this.getResurce(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        // return res.data.results.map(character => this._transformCharacter(character));
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        // console.log(character);
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[0].url,
        }
    }

}

export default MarvelService;