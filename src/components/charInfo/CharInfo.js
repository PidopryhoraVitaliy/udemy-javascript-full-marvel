import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [character, setCharacter] = useState(null);

    const { getCharacter, clearError, proc: process, setProcess } = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.characterId]);

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    const updateCharacter = () => {
        const { characterId } = props;
        if (!characterId) {
            return;
        }
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="char__info">
            {setContent(process, View, character)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    const maxComicsLength = 10;
    const viewComicsList = comics.length === 0 ? [{ name: 'no comics' }] : comics.slice(0, maxComicsLength);
    const imgObjectFit = (thumbnail.includes('image_not_available')) ? 'contain' : 'cover';
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{ objectFit: imgObjectFit }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    viewComicsList.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    characterId: PropTypes.number
}

export default CharInfo;