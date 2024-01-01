import { useEffect, useState } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 600_000);
        return () => {
            clearInterval(timerId);
        }
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1_011_400 - 1_011_000) + 1011000);
        // const id = Math.floor(Math.random() * (1_011_109 - 1_011_105) + 1_011_105); // id = 1_011_108 - error
        getCharacter(id).then(onCharLoaded);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = (!loading && !error && char) ? <View character={char} /> : null;

    return (
        <div className="randomchar">
            {/* {loading ? <Spinner /> : <View character={character} />} */}
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div >
    )
}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki } = character;

    const maxDescriptionLength = 220;
    const displayedDescription = (description.length > maxDescriptionLength ? (description.slice(0, maxDescriptionLength) + '...') : description);

    const imgObjectFit = (thumbnail.includes('image_not_available')) ? 'contain' : 'cover';

    return (
        < div className="randomchar__block" >
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={{ objectFit: imgObjectFit }} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {displayedDescription}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div >
    )
}

export default RandomChar;