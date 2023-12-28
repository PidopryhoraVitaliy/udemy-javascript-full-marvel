import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1550);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setError(false);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const selectedCharacter = props.selectedCharacter;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const charactersList = !(loading || error)
        ? charList.map(character => <View
            key={character.id}
            onCharacterSelected={props.onCharacterSelected}
            character={character}
            isSelected={character.id === selectedCharacter} />)
        : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {charactersList}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({ character, isSelected, onCharacterSelected }) => {
    const { name, thumbnail, id } = character;
    const className = "char__item" + (isSelected ? " char__item_selected" : "");
    const imgObjectFit = (thumbnail.includes('image_not_available')) ? 'contain' : 'cover';
    return (
        <li className={className}
            tabIndex={0}
            onClick={() => { onCharacterSelected(id) }}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === "Enter") {
                    e.preventDefault();
                    onCharacterSelected(id);
                }
            }}
        >
            <img src={thumbnail} alt={name} style={{ objectFit: imgObjectFit }} />
            <div className="char__name">{name}</div>
        </li>
    )
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func
}

export default CharList;
