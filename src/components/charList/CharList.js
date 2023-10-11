import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacters();
    }

    onError = () => {
        this.setState({ error: true, loading: false });
    }

    updateCharacters = () => {
        this.setState({ error: false, loading: true });
        this.marvelService
            .getAllCharacters()
            .then((characters) => {
                this.setState({ error: false, loading: false, characters });
            })
            .catch(this.onError)
    }

    render() {
        const { characters, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const charactersList = !(loading || error)
            ? characters.map(character => <View
                key={character.id}
                onCharacterSelected={this.props.onCharacterSelected}
                character={character}
                isSelected={false} />)
            : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {charactersList}
                </ul>
                <button className="button button__main button__long">
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
            onClick={() => { onCharacterSelected(id) }}
        >
            <img src={thumbnail} alt={name} style={{ objectFit: imgObjectFit }} />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;
