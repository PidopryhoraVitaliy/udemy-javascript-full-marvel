import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return (
                <>
                    <Component />
                    <Spinner />
                </>
            );
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210); //(1550);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, proc: process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        // setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const renderItems = (charList) => {
        // console.log('render');
        return (
            <TransitionGroup component={null}>
                {charList.map(character =>
                    <CSSTransition
                        key={character.id}
                        timeout={1000}
                        classNames="item"
                    >
                        <View
                            key={character.id}
                            onCharacterSelected={props.onCharacterSelected}
                            character={character}
                            isSelected={character.id === props.selectedCharacter}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        )
    }

    // const elements = useMemo(() => {
    //     return setContent(process, () => renderItems(charList));
    // }, [process]);

    return (
        <div className="char__list">
            <ul className="char__grid">
                {/* {elements} */}
                {setContent(process, () => renderItems(charList))}
            </ul>
            <button
                className="button button__main button__long"
                //disabled={newItemLoading}
                disabled={process === 'loading'}
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
