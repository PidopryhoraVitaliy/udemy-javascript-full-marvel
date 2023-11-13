import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacter();
        }
    }

    onCharacterLoading = () => {
        this.setState({ error: false, loading: true });
    }
    onCharacterLoaded = (character) => {
        this.setState({ character, loading: false, error: false });
    }
    onError = () => {
        this.setState({ error: true, loading: false });
    }

    updateCharacter = () => {
        // throw new Error('crash....');
        const { characterId } = this.props;
        if (!characterId) {
            return;
        }
        this.onCharacterLoading();
        this.marvelService
            .getCharacter(characterId)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        const { character, loading, error } = this.state;

        const skeleton = character || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !character) ? <View character={character} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = character;
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