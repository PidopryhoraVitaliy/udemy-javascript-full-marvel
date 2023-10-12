import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {

    // constructor(props) {
    //     super(props);
    // }

    state = {
        character: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        // console.log('mount');
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 300000);
    }

    componentDidUpdate() {
        // console.log('update');
    }

    componentWillUnmount() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    onCharacterLoaded = (character) => {
        this.setState({ character, loading: false, error: false });
    }

    onError = () => {
        this.setState({ error: true, loading: false });
    }

    updateCharacter = () => {
        this.setState({ error: false, loading: true });
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            // .then(res => this.onCharacterLoaded(res));
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        // console.log('render');
        const { character, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View character={character} /> : null;

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
                    <button className="button button__main" onClick={this.updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div >
        )
    }
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