import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error, clearError, process: proc, setProcess } = useHttp();

    const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    const _apiKey = `apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
    const _baseOffset = 210;
    const _baseComicsOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // return res.data.results.map(character => _transformCharacter(character));
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (character) => {
        // console.log(character);
        return {
            id: character.id,
            name: character.name,
            description: !character.description ? 'no description' : character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[0].url,
            comics: character.comics.items
        }
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        // return res.data.results.map(comic => _transformComic(comic));
        return res.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    };

    const _transformComic = (comic) => {
        // console.log(comic);
        return {
            id: comic.id,
            title: comic.title,
            description: !comic.description ? 'no description' : comic.description,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            url: comic.urls[0].url,
            price: !comic.prices[0].price ? 'NOT AVAILABLE' : comic.prices[0].price,
            pageCount: comic.pageCount
                ? `${comic.pageCount} pages`
                : "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",
        }
    }

    return { loading, error, clearError, proc, setProcess, getAllCharacters, getCharacter, getCharacterByName, getAllComics, getComic }
}

export default useMarvelService;