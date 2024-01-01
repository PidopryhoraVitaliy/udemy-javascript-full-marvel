import { useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ComicsList />
                {/* <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected} selectedCharacter={selectedCharacter} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}
            </main>
        </div>
    )
}

export default App;