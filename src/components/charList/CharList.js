import { Component } from 'react';
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1550,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }
        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            error: false,
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({ error: true, loading: false });
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;
        const selectedCharacter = this.props.selectedCharacter;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const charactersList = !(loading || error)
            ? charList.map(character => <View
                key={character.id}
                onCharacterSelected={this.props.onCharacterSelected}
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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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
