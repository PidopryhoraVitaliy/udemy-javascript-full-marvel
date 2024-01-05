import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';
import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        getAllComics(offset).then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const comicsListView = (comicsList.length > 0)
        ? comicsList.map((comic, index) =>
            <View
                // key={comic.id}
                key={index}
                comic={comic}
            />)
        : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {comicsListView}
                {spinner}
            </ul>
            <button
                className="button button__main button__long"
                disabled={loading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({ comic }) => {
    const { id, title, thumbnail, url, price } = comic;
    return (
        <li className="comics__item">
            {/* <a href={url}> */}
            <Link to={`/comics/${id}`}>
                <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
            {/* </a> */}
        </li>
    )
}

export default ComicsList;