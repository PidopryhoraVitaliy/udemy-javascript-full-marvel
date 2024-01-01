import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210); //(1550);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        // setNewItemLoading(true);
        getAllCharacters(offset).then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        // setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const selectedCharacter = props.selectedCharacter;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const charactersList = (charList.length > 0)
        ? charList.map(character =>
            <View
                key={character.id}
                onCharacterSelected={props.onCharacterSelected}
                character={character}
                isSelected={character.id === selectedCharacter}
            />)
        : null;

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {charactersList}
                {spinner}
            </ul>
            <button
                className="button button__main button__long"
                //disabled={newItemLoading}
                disabled={loading}
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
